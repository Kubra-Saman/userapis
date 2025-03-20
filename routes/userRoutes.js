import express from "express";
import verifyToken from "../auth/verifyToken.js";
import {
  addUserController,
  getAllUsersController,
  deleteUserController,
  editUserController,
  getOneUserController,
  loginUserController
} from "../controller/userController.js";

const studentRoutes = express.Router();

studentRoutes.post("/add", addUserController);
studentRoutes.get("/getAllUsers", getAllUsersController);
studentRoutes.get("/getOneUser", getOneUserController);
studentRoutes.delete("/deleteUser/:id", deleteUserController);
studentRoutes.put("/editUser/:id",editUserController);
studentRoutes.post("/login",verifyToken,loginUserController)

export default studentRoutes;
