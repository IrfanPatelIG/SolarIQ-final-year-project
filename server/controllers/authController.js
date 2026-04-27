import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt.js";
import User from "../models/userModel.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!hasRequiredFields(name, email, password)) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: buildPublicUser(newUser),
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

    if (!hasRequiredFields(email, password)) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refresh_token = refreshToken;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: buildLoginResponse(user, accessToken, refreshToken),
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

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token required",
      });
    }

    let decoded;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const user = await User.findOne({
      where: { user_id: decoded.user_id },
    });

    if (!user || user.refresh_token !== refreshToken) {
      return res.status(403).json({
        success: false,
        message: "Refresh token mismatch",
      });
    }

    const newAccessToken = generateAccessToken(user);

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

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token required",
      });
    }

    const user = await User.findOne({
      where: { refresh_token: refreshToken },
    });

    if (!user) {
      return res.status(200).json({
        success: true,
        message: "Already logged out",
      });
    }

    user.refresh_token = null;
    await user.save();

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
    const user = await findCurrentUserById(req.user.user_id);

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

const hasRequiredFields = (...fields) => {
  return fields.every(Boolean);
};

const findUserByEmail = async (email) => {
  return User.findOne({ where: { email } });
};

const findCurrentUserById = async (userId) => {
  return User.findOne({
    where: { user_id: userId },
    attributes: [
      "user_id",
      "name",
      "email",
      "role",
      "created_at",
      "updated_at",
    ],
  });
};

const buildPublicUser = (user) => {
  return {
    user_id: user.user_id,
    name: user.name,
    email: user.email,
  };
};

const buildLoginResponse = (
  user,
  accessToken,
  refreshToken
) => {
  return {
    user: {
      ...buildPublicUser(user),
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};

const verifyRefreshToken = (refreshToken) => {
  return jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET
  );
};
