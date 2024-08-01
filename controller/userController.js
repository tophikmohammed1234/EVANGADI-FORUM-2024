// Library to create JSON web token
const jwt = require("jsonwebtoken");
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
      .json({ msg: "User Login successful", token });
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

module.exports ={login}