module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : "myswyftpay",
      script    : "index.js",
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production : {
        NODE_ENV:             "production",
        APP_ID:               "VMvhutWAGNpk78QXprTt",
        MASTER_KEY:           "8zqndJmKVnQER6aXsnWR",
        DOMAIN_NAME:          "myswyftpay.com",
        MONGODB_URI:          db(),
        MAILGUN_API_KEY:      "key-9vmhz-shoqd2qm8votyipmtnh-m9xjg6",
        PARSE_MOUNT:          "/1",
        PARSE_SERVER_URI:     "https://myswyftpay.com",
        PUB_SERVER_URL:       "https://myswyftpay.com",
        PORT:                 "3080",
        END_DATE:             "2017-04-19:12:00:00"
      }
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : "root",
      host : "104.207.132.52",
      ref  : "origin/master",
      repo : "git@github.com:CodeHaven9ja/msp.git",
      path : "/var/www/msp",
      "pre-setup" : "npm i -g pm2",
      "post-deploy" : "npm install && pm2 startOrRestart ecosystem.config.js --env production"
    },
    dev : {
      user : "node",
      host : "212.83.163.1",
      ref  : "origin/master",
      repo : "git@github.com:repo.git",
      path : "/var/www/development",
      "post-deploy" : "npm install && pm2 startOrRestart ecosystem.json --env dev",
      env  : {
        NODE_ENV: "dev"
      }
    }
  }
}

function db() {
  let user = "vibesyemmy";
  let pass = "Chestnut2012@";
  let url = "mongodb://"+user + ":" + pass +"@ds139725.mlab.com:39725/myswyftpay";
  return url;
}