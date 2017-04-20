require(__dirname + '/user.js');
require(__dirname + '/box.js');

Parse.Cloud.define('dashboard', (req, res) => {
  var user = req.user;
  var totalDonation, currentMatches, prevDonations, prevBenefits;
  var recentTransactions = [];
  var r = {};

  var Q = new Parse.Query("Count");
  Q.equalTo("type", "totalDonation");

  return Q.first().then((c) => {
    // console.log(c);
    totalDonation = c ? c.get("count") + 295000 : 295000;

    // Return current match
    // Count query for benex
    var bQ = new Parse.Query("Box");
    bQ.equalTo("beneficiary", user);
    bQ.lessThanOrEqualTo("confirmation_status", 1);

    // Count query for donor
    var dQ = new Parse.Query("Box");
    dQ.equalTo("donor", user);
    dQ.lessThanOrEqualTo("confirmation_status", 1);

    var mainCountQuery = Parse.Query.or(bQ, dQ);
    return mainCountQuery.count();
  }).then((c) => {
    currentMatches = c;

    // Count query for donor
    var dQ = new Parse.Query("Box");
    dQ.equalTo("donor", user);
    dQ.equalTo("confirmation_status", 2);

    return dQ.count();
  }).then((c) => {
    prevDonations = c;

    var bQ = new Parse.Query("Box");
    bQ.equalTo("beneficiary", user);
    bQ.equalTo("confirmation_status", 2);

    return bQ.count();
  }).then((c) => {
    prevBenefits = c;

    var bQ = new Parse.Query("Box");
    bQ.equalTo("confirmation_status", 2);
    bQ.limit(5);
    bQ.descending("updatedAt");
    bQ.include(["beneficiary", "donor"]);

    return bQ.find();
  }).then((b) => {
    // console.log(b);
    for (var i = 0; i < b.length; i++) {
      var tx = {};
      tx.createdAt = b[i].get("createdAt");
      tx.fullname = b[i].get("donor").get("firstname") + " " + b[i].get("donor").get("lastname");
      tx.plan = b[i].get("plan");
      recentTransactions.push(tx);
    }
    r.totalDonation = totalDonation;
    r.currentMatches = currentMatches;
    r.prevBenefits = prevBenefits;
    r.prevDonations = prevDonations;
    r.recentTransactions = recentTransactions;
    return res.success(r);
  }).catch((err) =>{
    return res.error(err);
  });
})