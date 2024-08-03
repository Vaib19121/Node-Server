const User = require("../Models/User");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    if (
        !req.body.email ||
        !req.body.password ||
        req.body.email == "" ||
        req.body.password == ""
    ) {
        res.status(400).json({
            error: "Bad Request",
        });
        return;
    }

    // check if user exists in database
    try {
        // Find the user by email and password
        const user = await User.findOne({
            where: { email: req.body.email, password: req.body.password },
        });

        if (user) {
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "3h" }
            );
            return res.send({ token: token, message: "Login successful" });
        } else {
            return res.status(401).json({
                error: "Unauthorized",
            });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
};

exports.register = async (req, res) => {
    try {
        console.log(req.body);
        if (
            !req.body.email ||
            !req.body.password ||
            req.body.email == "" ||
            req.body.password == ""
        ) {
            res.status(400).json({
                error: "Bad Request",
            });
            return;
        }

        const user1 = await User.findOne({
            where: { email: req.body.email, password: req.body.password },
        });

        if (user1) {
            return res.status(409).json({
                error: "User already exists",
            });
        }

        const user = await User.create({
            email: req.body.email,
            password: req.body.password,
        });

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "3h" }
        );

        return res.send({ token: token, message: "Registration successful" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
};

exports.logout = (req, res) => {
    res.send("Logout successful");
};
