const dbConection = require("../db/dbConfig");
const bcrypt = require("bcrypt");

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
    const [user] = await dbConection.query(
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

    await dbConection.query(
      "INSERT INTO userTable (username,firstname,lastname,email,password) VALUES (?,?,?,?,?)",
      [username, firstname, lastname, email, hashedPassword]
    );
    //     return res.status(201).json({ msg: "user registered successfully" });
    return res.status(201).json({ msg: "user registered successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "something went wrong" });
  }
}

module.exports = {
  register,
};
