import jwt from "jsonwebtoken";
import people from "../models/people.model.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

// Signup Controller for Registering user
export const signupRootUser = async (req, res) => {
  try {
    const {
      username,
      password,
      confirmPassword,
    } = req.body;

    if (!username ||  !password || !confirmPassword) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password do not match. Please try again.",
      });
    }

    const existingUser = await people.findOne({ username });  
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await people.create({
      username,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      user,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};



// Login controller for login 

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await people.findOne({ username });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: `User is not registered with us. Please sign up to continue.`,
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      user.token = token;
      await user.save();

      return res.status(200).json({
        success: true,
        token,
        user: {
          _id: user._id,
          username: user.username,
        },
        message: `User login successful.`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect.`,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `Login failure. Please try again.`,
    });
  }
};
