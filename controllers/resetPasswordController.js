const jwt = require("jsonwebtoken");
const User = require("../model/User");
const bcrypt = require('bcrypt');

const ResetPassword = async (req, res) => {
    const { newPassword, employeeId, token } = req.body;

    try {
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const hash = await bcrypt.hash(newPassword, 10);

        const updatedUser = await User.findOneAndUpdate({ username: employeeId }, { password: hash });

        res.json({ Status: "Success" });
        
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ status: "Error", message: "Token has expired" });
        }

        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ status: "Error", message: "Invalid token" });
        }

        console.log(err);
        res.status(500).json({ status: "Error", message: "Internal Server Error" });
    }
};


module.exports = { ResetPassword };