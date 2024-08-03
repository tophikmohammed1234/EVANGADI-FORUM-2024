const express = require("express");
const router = express.Router();
const { register,login,checkUser } = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register);
// check user route
router.get("/check",authMiddleware, checkUser);
//login route
router.post("/login", login);
module.exports = router;
