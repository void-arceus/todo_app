import express, { Router } from "express";
import {
    handleAddTask,
    handleGetTasks,
    handleDeleteTask,
    handleUpdateTask,
} from "../controllers/task.controller";
import { authUser } from "../middleware/auth.middleware";

const taskRouter: Router = express.Router();

taskRouter.post("/add", authUser, handleAddTask);
taskRouter.get("/tasks", authUser, handleGetTasks);
taskRouter.delete("/task/:id", authUser, handleDeleteTask);
taskRouter.patch("/task/:id", authUser, handleUpdateTask);

export default taskRouter;
