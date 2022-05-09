import { Router } from "express";
import { getOperations, Operation } from "../controllers/OperationsController.js";
import { operationValidation } from "../middlewares/OperationsMiddleware.js";

const operationsRouter = Router()

operationsRouter.post("/operation", operationValidation, Operation)
operationsRouter.get("/operations", getOperations)

export default operationsRouter