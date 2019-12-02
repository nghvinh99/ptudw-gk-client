var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models/');

passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({ where: { username: username } })
      .then(user => {
        if (!user) {
          return done(null, false);
        }
        user.validPassword(password, (err, res) => {
          if (!res) {
            return done(null, false);
          } else {
            return done(null, user);
          }
        })
      })
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
  .then ((user) => {
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
});

authenticationCheck = function() {
  return (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/users/login');
  }
}

module.exports = passport;