import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../../models/userModel.js";

import AppError from "../../utils/appError.js";

import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";

// Register
export const registerUserService = async ({ name, email, password }) => {
  const existingUser = await User.findOne({
    where: { email },
  });

  if (existingUser) {
    throw new AppError("User already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    user: buildPublicUser(user),
  };
};

// Login
export const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const accessToken = generateAccessToken(user);

  const refreshToken = generateRefreshToken(user);

  user.refresh_token = refreshToken;

  await user.save();

  return {
    user: {
      ...buildPublicUser(user),
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};

// Refresh Token
export const refreshTokenService = async (refreshToken) => {
  let decoded;

  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch {
    throw new AppError("Invalid refresh token", 401);
  }

  const user = await User.findOne({
    where: {
      user_id: decoded.user_id,
    },
  });

  if (!user || user.refresh_token !== refreshToken) {
    throw new AppError("Refresh token mismatch", 403);
  }

  const accessToken = generateAccessToken(user);

  return {
    accessToken,
  };
};

// Logout
export const logoutUserService = async (refreshToken) => {
  const user = await User.findOne({
    where: {
      refresh_token: refreshToken,
    },
  });

  if (!user) {
    return true;
  }

  user.refresh_token = null;

  await user.save();

  return true;
};

// Current User
export const getCurrentUserService = async (userId) => {
  const user = await User.findOne({
    where: {
      user_id: userId,
    },
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
    throw new AppError("User not found", 404);
  }

  return user;
};

// Helpers
const buildPublicUser = (user) => ({
  user_id: user.user_id,
  name: user.name,
  email: user.email,
});
