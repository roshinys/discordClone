const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.exists({ email: email.toLowerCase() });
    if (userExists) {
      return res
        .status(409)
        .json({ success: false, msg: "User Already Exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashPassword,
    });
    const token = jwt.sign(
      {
        userId: user.id,
        email,
      },
      process.env.PRIVATEKEY
    );
    res.status(209).json({
      success: true,
      msg: "successfully created User",
      userDetails: {
        username: user.username,
        email: user.email,
        token: token,
      },
    });
    return;
  } catch (err) {
    console.log(err);
    res.status(404).json({ success: false, msg: "Something Went Wrong" });
  }
};

module.exports = postRegister;
