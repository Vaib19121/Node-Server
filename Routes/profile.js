// routes/user.js
const express = require("express");
const router = express.Router();
const authenticateToken = require("../Middleware/Authenticate");
const Profile = require("../Controllers/Profile");

router.get("/", authenticateToken, Profile.getProfile);

router.get("/:userId", authenticateToken, Profile.getProfileByUserId);

router.post("/", authenticateToken, Profile.createProfile);

router.put("/", authenticateToken, Profile.updateProfile);

module.exports = router;
