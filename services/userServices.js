import { Error } from "mongoose";
import User from "../model/userModel.js";
import bcrypt from "bcrypt"

export const addUserServices = async (data) => {
  try {
    const { name, email, mobile, password } = data;
    if (!name || !email || !mobile || !password) {
      throw new Error("All fields are required");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      mobile,
      password: hashPassword,
    });
    await user.save();
  } catch (error) {
    throw new Error(error.message)
  }
};

