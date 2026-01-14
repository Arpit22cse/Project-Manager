require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

class AuthController {

  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
  httpOnly: true,
  secure: false,     // localhost
  sameSite: "lax",   // ✅ IMPORTANT
  path: "/",
  maxAge: 24 * 60 * 60 * 1000
});



    res.status(200).json({ user });
  }

  async register(req, res) {
    const { email, name, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, name, password: hashedPassword });

    try {
      await user.save();
    } catch (err) {
      return res.status(500).json({ message: "Error registering user" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
  httpOnly: true,
  secure: false,     // localhost
  sameSite: "lax",   // ✅ IMPORTANT
  path: "/",
  maxAge: 24 * 60 * 60 * 1000
});


    res.status(200).json({ user });
  }

  async logout(req, res) {
    //res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  }
}

module.exports = new AuthController();
