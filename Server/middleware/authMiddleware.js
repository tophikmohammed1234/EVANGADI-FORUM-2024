const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  // check if the authorization header starts with Bearer & extracts the token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid" });
  }
  // Extract the token from the header
  const token = authHeader.split(" ")[1];

  try {
    // verify the token using the secret key
    const { username, userid } = jwt.verify(token, process.env.JWT_SECRET);
    //   attach user data to the request object
    req.user = { username, userid };
    //   Pass control to the next middleware -questions and answers?
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid" });
  }
}

module.exports = authMiddleware;
