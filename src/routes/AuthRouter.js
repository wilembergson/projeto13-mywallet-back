import { Router } from "express";
import { getUsers, signIn, signUp } from "../controllers/AuthController.js";
import { signInValidation, signUpValidation } from "../middlewares/AuthMiddleware.js";

const authRouter = Router()

authRouter.post("/signup", signUpValidation, signUp)
authRouter.post("/signin", signInValidation, signIn)
authRouter.get("/users", getUsers)


export default authRouter