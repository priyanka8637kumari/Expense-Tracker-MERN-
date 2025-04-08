import userModel from "../models/Users.js";
import bcrypt from "bcrypt";

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new userModel({ name, email, password });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({ message: "Invalid credentials", success: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(403)
        .json({ message: "Invalid credentials", success: false });
    }

    //  // Set the userId in an HTTP-only cookie
    //  res.cookie("userId", user._id, {
    //   httpOnly: true, // Prevent access via JavaScript
    //   secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    //   sameSite: "Strict", // Prevent CSRF attacks
    //   maxAge: 24 * 60 * 60 * 1000, // 1 day
    // });

    // console.log("Cookie set: userId =", user._id);
    res
      .status(200)
      .json({
        message: "Login successful",
        success: true,
        userId: user._id,
        name: user.name,
        email: user.email,
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export { signup, login };
