const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../Utils/SendEmail");

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
            where: { email: req.body.email },
        });

        if (user) {
            if (user.password !== req.body.password) {
                return res.status(401).json({
                    error: "Incorrect password!",
                });
            }
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "3h" }
            );
            // check is profile exists
            const profile = await user.getProfile();

            return res.send({
                token: token,
                message: "Login successful",
                isProfileCompleted: profile ? true : false,
            });
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

exports.ForgotPassword = async (req, res) => {
    try {
        if (!req.body.email || req.body.email == "") {
            res.status(400).json({
                error: "Bad Request",
            });
            return;
        }

        const user = await User.findOne({
            where: { email: req.body.email },
        });

        if (!user) {
            return res.status(404).json({
                error: "User not found",
            });
        }

        // generate 4 digit Otp
        const otp = Math.floor(1000 + Math.random() * 9000);
        const token = jwt.sign(
            { email: req.body.email, otp: otp },
            process.env.JWT_SECRET,
            { expiresIn: "10m" }
        );

        sendMail(req.body.email, "Password Reset", `Your OTP is ${otp}`);
        return res.send({ message: "Email sent", otp: token });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
};

exports.VerifyOtp = async (req, res) => {
    try {
        if (!req.body.otp || req.body.otp == "" || !req.body.email) {
            res.status(400).json({
                error: "Bad Request",
            });
            return;
        }

        const user = await User.findOne({
            where: { email: req.body.email },
        });

        if (!user) {
            return res.status(404).json({
                error: "User not found",
            });
        }

        const token = jwt.verify(req.body.token, process.env.JWT_SECRET);
        if (token.otp !== req.body.otp) {
            return res.status(401).json({
                error: "Invalid Otp",
            });
        }

        return res.send({ message: "Otp verified" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
};

exports.ResetPassword = async (req, res) => {
    try {
        if (!req.body.password || req.body.password == "" || !req.body.email) {
            res.status(400).json({
                error: "Bad Request",
            });
            return;
        }
        const user = await User.findOne({
            where: { email: req.body.email },
        });

        if (!user) {
            return res.status(404).json({
                error: "User not found",
            });
        }

        user.password = req.body.password;
        await user.save();

        return res.send({ message: "Password reset successful" });
    } catch (error) {
        console.log("Error:", error);
    }
};

exports.logout = (req, res) => {
    res.send("Logout successful");
};
