const nodemailer = require("nodemailer");

exports.sendMail = async (email, subject, text, html = null) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: subject,
                text: text ? text: "",
                html:html
            };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.log(error);
    }
};
