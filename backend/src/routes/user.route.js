import express from "express";
import * as userCont from "../controllers/user.cont.js";

const userRouter = express.Router();

userRouter.post('/register', userCont.registerUser);
userRouter.post('/login', userCont.loginUser);

export default userRouter;