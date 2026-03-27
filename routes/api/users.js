const express = require("express");
const gravatar = require("gravatar");
const { check, validationResult } = require("express-validator");
const routes = express.Router();
const User = require("../../models/User");
const bcryptjs = require("bcryptjs");

//@access Public
//@desc   Register the user
//@route  POST /api/users
routes.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with min 6 characters").isLength(
      { min: 6 },
    ),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // See if the user exists
      const { name, email, password } = req.body;
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      // Get Users gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        password,
        avatar,
      });
      // Encrypt password
      const salt = await bcryptjs.genSalt(10);
      const passwordHash = await bcryptjs.hash(password, salt);
      user.password = passwordHash;
      await user.save();
      // return jsonwebtoken
      res.send(`${user.name} registered successfully`);
    } catch (error) {
      return res.status(500).send("Server error");
    }
  },
);
module.exports = routes;
