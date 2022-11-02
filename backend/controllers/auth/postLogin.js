const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    const result = await bcrypt.compare(password, user.password);
    const token = jwt.sign(
      {
        userId: user.id,
        email,
      },
      process.env.PRIVATEKEY
    );
    if (user && result) {
      res.status(200).json({
        success: true,
        msg: "successfully Logged In",
        userDetails: {
          username: user.username,
          email: user.email,
          token: token,
        },
      });
      return;
    }
    res.status(400).json({ success: true, msg: "Invalid Credentials" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ success: false, msg: "Something Went Wrong" });
  }
};

module.exports = postLogin;
