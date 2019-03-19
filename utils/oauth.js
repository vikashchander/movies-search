var passport  =require("passport");
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
    clientID:     '355216317724-nbhdnnjovk6di2rflvmmgaufp7tk7ngt.apps.googleusercontent.com',
    clientSecret: 'H4mf7iNppF-0_Ax6F50ORoNk',
    callbackURL: "http://localhost:3333/auth/google/callback",
    passReqToCallback   : true
  },
  (request, accessToken, refreshToken, profile, done)=> {
   {
      return done(null, profile);
    }
  }
));
module.exports = passport;
