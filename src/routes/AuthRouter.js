import { Router } from "express";
import { getUsers, signUp } from "../controllers/AuthController.js";
import { signUpValidation } from "../middlewares/AuthMiddleware.js";

const userRouter = Router()

userRouter.post("/signup", signUpValidation, signUp)
userRouter.get("/users", getUsers)

export default userRouter