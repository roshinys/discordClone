const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // console.log("am i hting here")
  let token = req.body.token || req.params.token || req.header("Authorization");
  console.log("token ===>", token);
  if (!token) {
    return res
      .status(403)
      .json({ success: false, msg: "requires token to login" });
  }

  try {
    // token = token.replace(/^Bearer\s+/, "");
    req.user = jwt.verify(token, process.env.PRIVATEKEY);
  } catch (err) {
    console.log(err);
    res.status(403).json({ success: false, msg: "invalid token " });
  }
  return next();
};

module.exports = verifyToken;
