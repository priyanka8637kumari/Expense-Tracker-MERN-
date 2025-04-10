import userModel from "../models/Users.js";
import bcrypt from "bcrypt";

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }
    const newUser = new userModel({ name, email, password });
    newUser.password = await bcrypt.hash(password, 10); // Hash the password using bcrypt
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
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password); // Compare the hashed password with the provided password
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }
    res.status(200).json({
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
