import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// POST request /api/users/login
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // Set JWT as HTTP-Only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 100,
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.send("auth user");
});

// POST /api/users
const reigsterUser = asyncHandler(async (req, res) => {
  res.send("register user");
});

// Clear cookie on logout
// POST /api/users/logout
const logoutUser = asyncHandler(async (req, res) => {
  res.send("logout user");
});

// GET /api/users/profile
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});

// PUT /api/users/profile
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user");
});

// GET /api/users
// FOR ADMIN
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

// GET /api/users/:id
// FOR ADMIN
const getUserByID = asyncHandler(async (req, res) => {
  res.send("get user by ID");
});

// DELETE /api/users/:id
// FOR ADMIN
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

// PUT /api/users/:id
// FOR ADMIN
const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

export {
  authUser,
  reigsterUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser,
};
