import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt.js";
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

    // 🔸 5. Response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          user_id: newUser.user_id,
          name: newUser.name,
          email: newUser.email,
        },
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
        message: "Invalid credentials",
      });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 4. Generate Tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // 5. Save refresh token in DB
    user.refresh_token = refreshToken;
    await user.save();

    // 6. Response
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
        accessToken,
        refreshToken,
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



export const refreshTokenHandler = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    // 1. Check token exists
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token required",
      });
    }

    // 2. Verify refresh token
    let decoded;
    try {
      decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET
      );
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    // 3. Find user
    const user = await User.findOne({
      where: { user_id: decoded.user_id },
    });

    if (!user || user.refresh_token !== refreshToken) {
      return res.status(403).json({
        success: false,
        message: "Refresh token mismatch",
      });
    }

    // 4. Generate new access token
    const newAccessToken = generateAccessToken(user);

    // 5. Send response
    return res.status(200).json({
      success: true,
      message: "Access token refreshed",
      accessToken: newAccessToken,
    });

  } catch (error) {
    console.error("Refresh Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const logoutUser = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    // 1. Check token
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token required",
      });
    }

    // 2. Find user with this token
    const user = await User.findOne({
      where: { refresh_token: refreshToken },
    });

    if (!user) {
      return res.status(200).json({
        success: true,
        message: "Already logged out",
      });
    }

    // 3. Remove refresh token
    user.refresh_token = null;
    await user.save();

    // 4. Response
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { user_id: req.user.user_id },
      attributes: [
        "user_id",
        "name",
        "email",
        "role",
        "created_at",
        "updated_at",
      ],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Get Current User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};