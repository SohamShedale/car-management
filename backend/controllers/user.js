import { User } from "../models/user-model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { fullName, email, contact, password } = req.body;
    if (!fullName || !email || !password || !contact) {
      return res.status(400).json({
        message: "Fill all the details",
        success: false,
      });
    }
    
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist",
        success: false,
      });
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.json({ message: err.message, success: false });
        else await User.create({ fullName, email, contact, password: hash });
      });
    });

    return res.status(200).json({
      message: "Account Created",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({email});

    if(!user){
        return res.status(404).json({
            message: "User not found",
            success: false,
        });
    };

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid Password",
        success: false,
      });
    };

    const tokenData = {
        userId: user._id,
    }

    const token = jwt.sign(tokenData, process.env.SECRET_KEY); 

    user = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        contact: user.contact,
    };

    return res.status(200).cookie("token", token).json({
        message: `Welcome back ${user.fullName}`,
        user,
        success: true,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "").json({
      message: "Logout successfully",
      success: true,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    })
  }
}