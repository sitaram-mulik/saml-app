const passport = require('passport');
const passportSaml = require('passport-saml');
const fs = require('fs');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// SAML strategy for passport -- Single IPD
const strategy = new passportSaml.Strategy(
  {
    entryPoint: 'https://sitaram-mulik.ite1.idng.ibmcloudsecurity.com/saml/sps/saml20ip/saml20/login',
    issuer: 'https://sitaram-mulik.ite1.idng.ibmcloudsecurity.com/saml/sps/saml20ip/saml20/8de8721f73f94264',
    callbackUrl: 'http://localhost:9000/saml/login/sso/callback',
    // Service Provider private key
    //decryptionPvk: fs.readFileSync(__dirname + '/cert/key.pem', 'utf8'),
    // Service Provider Certificate
    //privateCert: fs.readFileSync(__dirname + '/cert/cert.pem', 'utf8'),
    cert: fs.readFileSync(__dirname + '/cert/idp_cert.pem', 'utf8'),
  },
  (profile, done) => done(null, profile),
);

passport.use(strategy);
module.exports = passport;