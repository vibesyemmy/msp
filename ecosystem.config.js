module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : "instant-touch",
      script    : "index.js",
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production : {
        NODE_ENV:             "production",
        APP_ID:               "VMvhutWAGNpk78QXprTt",
        MASTER_KEY:           "8zqndJmKVnQER6aXsnWR",
        DOMAIN_NAME:          "instanttouch.net",
        MONGODB_URI:          db(),
        MAILGUN_API_KEY:      "key-9vmhz-shoqd2qm8votyipmtnh-m9xjg6",
        PARSE_MOUNT:          "/1",
        PARSE_SERVER_URI:     "https://instanttouch.net",
        PUB_SERVER_URL:       "https://instanttouch.net",
        PORT:                 "3070",
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
      repo : "git@github.com:CodeHaven9ja/p2.git",
      path : "/var/www/production",
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
  let user = "admin";
  let pass = "admin";
  let url = "mongodb://"+user + ":" + pass +"@ds063406.mlab.com:63406/instanttouch";
  return url;
}