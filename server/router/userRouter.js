import express from "express";
import { login, register, updateAddress, getAllCategory } from '../controllers/userController.js'
import { isUserAuth } from "../middleWare/isAuthUser.js";
import { getSearch } from "../controllers/searchController.js";
import jobRouter from "./jobRouter.js";


const userRouter = express.Router();

userRouter.use('/jobs', jobRouter);
userRouter.post('/login-user', login);
userRouter.get('/get-category', getAllCategory);
userRouter.post('/register-user', register);
userRouter.put('/update-address', isUserAuth, updateAddress);
userRouter.get("/getHistory?status=Posted",isUserAuth,getHistory)
export default userRouter;
