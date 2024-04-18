require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const session = require("express-session");
require("./db/conn");

const app = express();

app.use(
	session({
		secret: process.env.SESSION_SECRET || "default-secret", // Use environment variable or default value
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
		},
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		credentials: true,
	})
);

app.use("/auth", authRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));