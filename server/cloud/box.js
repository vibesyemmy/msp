
var Box = Parse.Object.extend("Box");

Parse.Cloud.job('match', (req, stat) => {
  var plan = parseInt(req.params.plan);
  console.log(plan);
  var limit = req.params.limit ? req.params.limit : 0;

  var beneficiaries = [];
  var donors = [];
  var promises = [];
  var dc = 0;

  // Beneficiary query
  var bq = new Parse.Query(Parse.User);
  bq.equalTo("confirmation_count", 2);
  bq.equalTo("benefit_count", 0);
  bq.lessThanOrEqualTo("in_box_count", 1);
  bq.equalTo("active", true);
  bq.equalTo("suspended", false);
  bq.equalTo("plan", plan);
  bq.descending("createdAt");
  bq.limit(limit);

  // Donor query
  var dq = new Parse.Query(Parse.User);
  dq.lessThanOrEqualTo("in_box_count", 1);
  dq.lessThanOrEqualTo("confirmation_count", 1);
  dq.notEqualTo("role", 0);
  dq.notEqualTo("role", 1);
  dq.equalTo("active", true);
  dq.equalTo("suspended", false);
  dq.equalTo("plan", plan);
  dq.ascending("createdAt");

  bq.find().then((users) => {
    console.log(beneficiaries.length);
    beneficiaries = users;
    var donor_count = beneficiaries.length * 3;

    dq.limit(donor_count);
    return dq.find();
  }).then((donors) => {
    var c = 0;
    var c2 = 0;
    var c3 = 1;
    console.log(donors.length);

    for (var i = 0; i < beneficiaries.length; i++) {
      c2 = c + 1;
      c3 = c2 + 1;

      var d1, d2, d3;
      var b1, b2, b3;

      var benex = beneficiaries[i];
      d1 = donors[c];
      d2 = donors[c2];
      d3 = donors[c3];
      console.log(benex.id, d1.id, d2.id, d3.id);

      if (d1 && d2 && d3) {
        b1 = new Box();
        b1.set("beneficiary", benex);
        b1.set("donor", d1);
        b1.set("confirmation_status", 0);
        b1.set("timer_status", 0);
        b1.set("plan", plan);

        b2 = new Box();
        b2.set("beneficiary", benex);
        b2.set("donor", d2);
        b2.set("confirmation_status", 0);
        b2.set("timer_status", 0);
        b2.set("plan", plan);

        b3 = new Box();
        b3.set("beneficiary", benex);
        b3.set("donor", d3);
        b3.set("confirmation_status", 0);
        b3.set("timer_status", 0);
        b3.set("plan", plan);

        c = c + 3;

        promises.push(b1.save());
        promises.push(b2.save());
        promises.push(b3.save());
      }
    }
    return Parse.Promise.when(promises);
  }).then(() => {
    return stat.success("Match done for " + plan + " plan. "+promises.length+" matches were made");
  }).catch((err) => {
    return stat.error({error: "An Error occurred!"});
  });
});

Parse.Cloud.beforeSave("Box", (req, res) => {
  var box = req.object;
  var donor, benex;
  // var in_box_count = donor.get("in_box_count");
  if (!box.get("beneficiary") || !box.get("donor")) {
    res.error("Can't save box without a beneficiary or donor");
  }

  if (box.get("beneficiary").id === box.get("donor").id) {
    res.error("Can't save. Beneficiary can't be donor.");
  }

  var bq = new Parse.Query(Parse.User);
  bq.equalTo("objectId", box.get("beneficiary").id);

  return bq.first().then((b) => {
    if (b.get("in_box_count") > 2 && !box.existed()) {
      return res.error("Can't save. Beneficiary can't in 3 boxes.");
    }
    var d = new Parse.Query(Parse.User);
    d.equalTo("objectId", box.get("donor").id);
    return d.first();
  }).then((d) => {
    if (d.get("confirmation_count") >= 1  && !box.existed()) {
      return res.error("Can't save. Donor can't in 2 boxes.");
    }
    return res.success();
  });

});

Parse.Cloud.afterSave("Box", (req, res) => {
  var benex, donor;
  var box = req.object;
  var promises = [];

  if (!box.existed()) {
    return getUser(box.get("beneficiary").id).then((b) => {
      console.log(b.get("username"));
      benex = b;
      benex.increment("in_box_count");
      promises.push(benex.save(null, { useMasterKey: true }));
      return getUser(box.get("donor").id);
    }).then((d) => {
      console.log(d.get("username"));
      donor = d;
      donor.increment("in_box_count");
      promises.push(donor.save(null, { useMasterKey: true }));
      return Parse.Promise.when(promises);
    });
  }

  if (box.get("confirmation_status") == 2) {
    return getUser(box.get("beneficiary").id).then((b) => {
      console.log(b.get("username"));
      benex = b;
      benex.increment("in_box_count", -1);

      // Reset logic
      if(benex.get("benefit_count") == 3) {
        if (benex.get("role") >= 2) {
          benex.set("confirmation_count", 0);
        }
        benex.set("benefit_count", 0);
      } else {
        benex.increment("benefit_count");
      }

      promises.push(benex.save(null, { useMasterKey: true }));
      return getUser(box.get("donor").id);
    }).then((d) => {
      console.log(d.get("username"));
      donor = d;
      donor.increment("in_box_count", -1);
      donor.increment("confirmation_count");
      promises.push(donor.save(null, { useMasterKey: true }));
      return Parse.Promise.when(promises);
    }).then(() => {
      var cQ = new Parse.Query("Count");
      cQ.equalTo("type", "totalDonation");
      return cQ.first();
    }).then((c) => {
      var count = c;
      if (!count) {
        var Count = Parse.Object.extend("Count");
        var count = new Count();
        count.set("type", "totalDonation")
      }
      count.increment("count", getAmount(box.get("plan")));
      return count.save();
    });
  }

  if (box.get("confirmation_status") == 3) {
    return getUser(box.get("beneficiary").id).then((b) => {
      console.log(b.get("username"));
      benex = b;
      benex.increment("in_box_count", -1);
      promises.push(benex.save(null, { useMasterKey: true }));
      return getUser(box.get("donor").id);
    }).then((d) => {
      console.log(d.get("username"));
      donor = d;
      donor.increment("in_box_count", -1);
      promises.push(donor.save(null, { useMasterKey: true }));
      return Parse.Promise.when(promises);
    }).then(() => {
      donor.set("suspended", true);
      return donor.save(null, { useMasterKey: true });
    });
    // .then(() => {
    //   let newDonorQ = new Parse.Query(Parse.User);
    //   newDonorQ.notEqualTo("objectId", benex.id);
    //   newDonorQ.equalTo("plan", benex.get("plan"));
    //   newDonorQ.equalTo("active", true);
    //   newDonorQ.equalTo("suspended", false);
    //   newDonorQ.equalTo("in_box_count", 0);
    //   newDonorQ.notEqualTo("role", 0);
    //   newDonorQ.notEqualTo("role", 1);
    //   return newDonorQ.first();
    // }).then((u) => {
    //   let b1 = new Box();
    //   b1.set("beneficiary", benex);
    //   b1.set("donor", u);
    //   b1.set("confirmation_status", 0);
    //   b1.set("timer_status", 0);
    //   b1.set("plan", benex.get("plan"));
    //   return b1.save();
    // });
  }
});

function getUser(id) {
  var user = new Parse.Query(Parse.User);
  user.equalTo("objectId", id);
  return user.first().then((user) => {
    return user;
  });
}

function getDonor(id, plan) {
  var user = new Parse.Query(Parse.User);
  user.notEqualTo("objectId", id);
  user.lessThanOrEqualTo("in_box_count", 1);
  user.lessThanOrEqualTo("confirmation_count", 1);
  user.notEqualTo("role", 0);
  user.notEqualTo("role", 1);
  user.equalTo("active", true);
  user.equalTo("suspended", false);
  user.equalTo("plan", plan);
  user.descending("createdAt");
  return user.first();
}

function addUserToPromiseArray(res, array, b, d, status) {
  array.push(b.save(null, { useMasterKey: true }));
  array.push(d.save(null, { useMasterKey: true }));

  return Parse.Promise.when(array);
}

function getAmount(plan) {
  switch (plan) {
    case 1: {
      return 10000;
    }
    case 2: {
      return 25000;
    }
    case 3: {
      return 50000;
    }
    case 4: {
      return 100000;
    }
  }
}
