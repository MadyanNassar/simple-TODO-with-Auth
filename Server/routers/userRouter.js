const express = require("express");
const getUser = require("../controllers/Users/getUser");
const registerUser = require("../controllers/Users/registerUser");
const logInUser = require("../controllers/Users/logInUser");
const logOutUser = require("../controllers/Users/logOutUser");

const router = express.Router();

router.get("/", getUser);
router.post("/register", registerUser);
router.post("/login", logInUser);
router.post("/logout", logOutUser);

module.exports = router;
