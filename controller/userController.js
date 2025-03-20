import generateToken from "../auth/generateToken.js";
import User from "../model/userModel.js";
import { addUserServices } from "../services/userServices.js";
import bcrypt from "bcrypt";

export const addUserController = async (req, res) => {
  try {
    const user = addUserServices(req.body);
    return res.status(200).json({
      success: true,
      message: "Student Created Successfully",
      user: user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      success: true,
      message: "user details fetch successfully",
      length: users.length,
      users: users,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOneUserController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    return res.status(200).json({ success: true, user: user });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, Message: "Student Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const editUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = { ...req.body };
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }
    await User.findByIdAndUpdate(userId, { ...req.body }, { new: true });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }
    return res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      user: user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Student Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    const token = generateToken(user);
    console.log(token);

    if (isMatch) {
      return res
        .status(200)
        .json({ success: true, message: "login successfull", user: user });
    }
    return res.status(401).json({ success: false, message: "login failed" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
