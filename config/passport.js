var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models/');

passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({where: {username: username}})
    .then( user => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
  .then ((user) => {
    console.log(user.get({plain: true}));
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
});

module.exports = passport;