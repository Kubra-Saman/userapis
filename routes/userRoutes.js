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

studentRoutes.post("/add",verifyToken,addUserController);
studentRoutes.get("/getAllUsers",verifyToken,getAllUsersController);
studentRoutes.get("/getOneUser",verifyToken,getOneUserController);
studentRoutes.delete("/deleteUser/:id",verifyToken,deleteUserController);
studentRoutes.put("/editUser/:id",verifyToken,editUserController);
studentRoutes.post("/login",loginUserController)

export default studentRoutes;
