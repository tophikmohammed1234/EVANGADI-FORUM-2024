const dbConnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");

// Library to create JSON web token
const jwt = require("jsonwebtoken");

async function register(req, res) {
	const { username, firstname, lastname, email, password } = req.body;

	// Validate input
	if (!username || !firstname || !lastname || !email || !password) {
		return res.status(400).json({
			msg: "please provide all required information",
		});
	}

	// Check if user already exists
	try {
		const [user] = await dbConnection.query(
			"SELECT username,userid FROM userTable WHERE username = ? or email = ?",
			[username, email]
		);

		// Check if user already exists
		if (user.length > 0) {
			return res.status(409).json({ msg: "user already exists" });
		}

		// Check if password is less than 8 characters
		if (password.length < 8) {
			return res
				.status(400)
				.json({ msg: "password must be at least 8 characters" });
		}
		//encrypt password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		await dbConnection.query(
			"INSERT INTO userTable (username,firstname,lastname,email,password) VALUES (?,?,?,?,?)",
			[username, firstname, lastname, email, hashedPassword]
		);
		return res.status(201).json({ msg: "user registered successfully" });
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ msg: "something went wrong" });
	}
}

// LOGIN
async function login(req, res) {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			error: "Bad Request",
			message: "Please provide all required fields",
		});
	}
	try {
		const [user] = await dbConnection.query(
			"SELECT username,userid,password FROM userTable WHERE email=?",
			[email]
		);

		if (user.length === 0) {
			return res.status(StatusCodes.UNAUTHORIZED).json({
				error: "Unauthorized",
				message: "Invalid username or password",
			});
		}
		// To compare a plaintext password (not hashed password) with a hashed password that comes from database this return boolean value
		const isMatch = await bcrypt.compare(password, user[0].password);
		console.log(user[0].password);

		//  if the password not match it returns Invalid Password
		if (!isMatch) {
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.json({ message: "Invalid password" });
		}

		const username = user[0].username;
		const userid = user[0].userid;
		// To create JSON Web Token(JWT) using the jsonwebtoken library
		// jwt.sign()used to create new JWT token it takes three arguments {the payeload,which is the data include in the JWT},"Secret key used to sign the JWT this used to verify the token",{expiration time}
		const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});
		return res
			.status(StatusCodes.OK)
			.json({ msg: "User Login successful", token, username });
	} catch (error) {
		console.log(error.message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: "Internal Server Error",
			message: "An unexpected error occurred.",
		});
	}
}

async function checkUser(req, res) {
	const username = req.user.username;
	const userid = req.user.userid;

	res.status(StatusCodes.OK).json({ msg: "valid user", username, userid });
}

module.exports = {
	register,
	login,
	checkUser,
};
