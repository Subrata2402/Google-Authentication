const router = require("express").Router();
const passport = require("passport");
require("../passportStrategies/googleStrategy");
require("../passportStrategies/localStrategy");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

router.post(
	"/login",
	passport.authenticate("local")
);

router.post("/register", async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const user = await User.findOne({ email: email });

		if (user) {
			return res.status(400).json({ success: false, message: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			displayName: name,
			email: email,
			password: hashedPassword,
		});

		await newUser.save();
		res.json({ success: true, message: "User created successfully" });

	} catch (error) {
		res.status(500).json({ success: false, message: "Internal server error" });
	}
});

router.get("/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			success: true,
			message: "User has successfully authenticated",
			user: req.user,
		});
	} else {
		res.status(403).json({ success: false, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		success: false,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: process.env.CLIENT_URL + "/login"
	})
);

router.get("/logout", (req, res) => {
	req.logout((error) => {
		if (error) return next(error);
		res.redirect(process.env.CLIENT_URL);
	})
})

module.exports = router;