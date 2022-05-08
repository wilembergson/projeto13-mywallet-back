import { Router } from "express";
import { getUsers, signIn, signUp } from "../controllers/AuthController.js";
import { signUpValidation } from "../middlewares/AuthMiddleware.js";

const userRouter = Router()

userRouter.post("/signup", signUpValidation, signUp)
userRouter.post("/signin", signIn)
userRouter.get("/users", getUsers)

export default userRouter