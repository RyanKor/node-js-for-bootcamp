const LocalStrategy = require('passport-local').Strategy;
import bcrypt from 'bcrypt'
import {User} from '../models'

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      const exUser = await User.findOne({ where: { email } });
      if (exUser) {
        const result = await bcrypt.compare(password, exUser.password);
        if (result) {
          done(null, exUser);
        } else {
          done(null, false, { message: 'Password does not matched' });
        }
      } else {
        done(null, false, { message: 'No info about the user' });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};