const express = require("express");
const router = express.Router();
const authenticateToken = require("../Middleware/Authenticate");
const Answer = require("../Controllers/Answer");

router.post("/", authenticateToken, Answer.SubmitAnswer);

module.exports = router;
