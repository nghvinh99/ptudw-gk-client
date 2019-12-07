var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models/');

passport.use(new LocalStrategy({ passReqToCallback : true },
  function (req, username, password, done) {
    User.findOne({ where: { username: username } })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash('error', 'Tài khoản hoặc mật khẩu không hợp lệ'));
        }
        user.validPassword(password, (err, res) => {
          if (!res) {
            return done(null, false, req.flash('error', 'Tài khoản hoặc mật khẩu không hợp lệ'));
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

module.exports = passport;