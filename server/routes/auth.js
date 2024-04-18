const router = require("express").Router();
const passport = require("passport");
require('../passportStrategy');

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