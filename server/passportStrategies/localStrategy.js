const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/userSchema');

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email: email });

                if (!user) {
                    return done(null, false, { message: 'Incorrect email' });
                }

                const isPasswordMatch = await bcrypt.compare(password, user.password);

                if (!isPasswordMatch) {
                    return done(null, false, { message: 'Incorrect password' });
                }

                return done(null, user);
            } catch (err) {
                console.error(err);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});