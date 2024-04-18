const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/userSchema");

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
		async (accessToken, refreshToken, profile, done) => {
			const newUser = {
				googleId: profile.id,
				displayName: profile.displayName,
				email: profile.emails[0].value,
				image: profile.photos[0].value,
			};

			try {
				let user = await User.findOne({ email: profile.emails[0].value });

				if (user) {
					done(null, user);
				} else {
					user = await User.create(newUser);
					done(null, user);
				}
			} catch (err) {
				console.error(err);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});