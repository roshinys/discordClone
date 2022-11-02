const express = require("express");

const router = express.Router();
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const authController = require("../controllers/auth/authController");
const verifyToken = require("../middleware/auth");

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .max(12)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(6)
    .max(12)
    .required(),
});

router.post("/login", validator.body(loginSchema), authController.postLogin);

router.post(
  "/register",
  validator.body(registerSchema),
  authController.postRegister
);

router.get("/test", verifyToken, (req, res) => {
  const user = req.user;
  res.json({ msg: "ok dude", user });
});

module.exports = router;
