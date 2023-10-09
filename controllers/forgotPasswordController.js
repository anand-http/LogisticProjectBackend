const User = require('../model/User');
const Jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const ForgotPassword = async (req, res) => {
  const employeeId = req.body.username;

  try {
    const employee = await User.findOne({ username: employeeId }).select('email');

    if (!employee) {
      return res.status(404).json({ message: "Employee not found with the given username" });
    }

    const email = employee.email;

    const token = Jwt.sign({
      "UserInfo": {
        "username": employeeId,
        "email": employee.email
      }
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2m' });

    sendPasswordResetEmail(email, token, employeeId, res); // Pass the `res` object to sendPasswordResetEmail
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

sendPasswordResetEmail = (email, token, employeeId, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rishusingh9369@gmail.com',
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: 'rishusingh9369@gmail.com',
    to: email,
    subject: 'Password Reset Link',
    text: `Click on this link for password reset its valid only for 2 minutes:  http://localhost:3000/reset-password/${employeeId}/${token}`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to send password reset email' });
    } else {
      console.log("Password reset email sent , Plz check your inbox");
      res.json({ message: 'Password reset email sent successfully' });
    }
  });
}

module.exports = { ForgotPassword };
