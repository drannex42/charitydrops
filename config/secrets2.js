/**
 * LOCAL-TESTING
*/

module.exports = {

  db: process.env.MONGODB|| 'mongodb://localhost/test/db3',

  sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here',

  mailgun: {
    user: process.env.MAILGUN_USER || 'postmaster@sandbox697fcddc09814c6b83718b9fd5d4e5dc.mailgun.org',
    password: process.env.MAILGUN_PASSWORD || '29eldds1uri6'
  },

  mandrill: {
    user: process.env.MANDRILL_USER || 'hackathonstarterdemo',
    password: process.env.MANDRILL_PASSWORD || 'E1K950_ydLR4mHw12a0ldA'
  },

  sendgrid: {
    user: process.env.SENDGRID_USER || 'hslogin',
    password: process.env.SENDGRID_PASSWORD || 'hspassword00'
  },

  nyt: {
    key: process.env.NYT_KEY || 'hello'
  },


  facebook: {
    clientID: process.env.FACEBOOK_ID || '1525261901051430',
    clientSecret: process.env.FACEBOOK_SECRET || 'c1c5808e3486ef2aa633acb14e6d1cd7',
    callbackURL: '/auth/facebook/callback',
    passReqToCallback: true
  },

  instagram: {
    clientID: process.env.INSTAGRAM_ID || 'hello',
    clientSecret: process.env.INSTAGRAM_SECRET || 'hello',
    callbackURL: '/auth/instagram/callback',
    passReqToCallback: true
  },

  github: {
    clientID: process.env.GITHUB_ID || 'hello',
    clientSecret: process.env.GITHUB_SECRET || 'hello',
    callbackURL: '/auth/github/callback',
    passReqToCallback: true
  },

  twitter: {
    consumerKey: process.env.TWITTER_KEY || 'hello',
    consumerSecret: process.env.TWITTER_SECRET  || 'hello',
    callbackURL: '/auth/twitter/callback',
    passReqToCallback: true
  },

  google: {
    clientID: process.env.GOOGLE_ID || 'hello',
    clientSecret: process.env.GOOGLE_SECRET || 'hello',
    callbackURL: '/auth/google/callback',
    passReqToCallback: true
  },

  linkedin: {
    clientID: process.env.LINKEDIN_ID || 'hello',
    clientSecret: process.env.LINKEDIN_SECRET || 'hello',
    callbackURL: '/auth/linkedin/callback',
    scope: ['r_fullprofile', 'r_emailaddress', 'r_network'],
    passReqToCallback: true
  },


  twilio: {
    sid: process.env.TWILIO_SID || 'hello',
    token: process.env.TWILIO_TOKEN || 'hello'
  },

  clockwork: {
    apiKey: process.env.CLOCKWORK_KEY || 'hello'
  },

  stripe: {
    apiKey: process.env.STRIPE_KEY || 'sk_test_JULgftCMYTMqPk9UcgYyaxXy'
  },

  tumblr: {
    consumerKey: process.env.TUMBLR_KEY || 'hello',
    consumerSecret: process.env.TUMBLR_SECRET || 'hello',
    callbackURL: '/auth/tumblr/callback'
  },

  foursquare: {
    clientId: process.env.FOURSQUARE_ID || 'hello',
    clientSecret: process.env.FOURSQUARE_SECRET || 'hello',
    redirectUrl: process.env.FOURSQUARE_REDIRECT_URL || '/auth/foursquare/callback'
   },

  venmo: {
    clientId: process.env.VENMO_ID || 'hello',
    clientSecret: process.env.VENMO_SECRET || 'hello',
    redirectUrl: process.env.VENMO_REDIRECT_URL || 'hello'
  }
};
