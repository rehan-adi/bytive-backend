import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import people from "../models/people.model.js";
import dotenv from "dotenv";

dotenv.config();

// Signup Controller for Registering Root User
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

    const existingUser = await people.findOne({ username, password });  
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

    const user = await people.findOne({ username, password });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { password: user.password, id: user._id },
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
          password: user.password,
        },
        message: `User Login Success`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    });
  }
};


