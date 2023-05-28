const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controller/userController");

const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

module.exports = router;
