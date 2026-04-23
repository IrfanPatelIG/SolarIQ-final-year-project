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
          user_id: newUser.user_id,
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



export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    // 2. Find user
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email",
      });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // 4. Generate token
    const token = generateToken(user);

    // 5. Response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          user_id: user.user_id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};