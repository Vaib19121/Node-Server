// middleware/authenticate.js
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const Profile = require("../Models/Profile");

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);

    if (token == null) {
        return res.sendStatus(401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    User.findByPk(decoded.id, { include: { model: Profile } })
        .then((user) => {
            if (user) {
                req.user = user;
                next();
            } else {
                console.log("User not found");
                return res.sendStatus(401);
            }
        })
        .catch((err) => {
            console.log(err);
            return res.sendStatus(401);
        });
}

module.exports = authenticateToken;
