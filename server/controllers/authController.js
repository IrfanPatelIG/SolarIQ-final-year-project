import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import User from "../models/userModel.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 🔸 1. Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 🔸 2. Check if user exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // 🔸 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔸 4. Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 🔸 5. Generate JWT
    const token = generateToken(newUser);
    console.log("User:", newUser.name, "\nToken:", token);

    // 🔸 6. Response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};