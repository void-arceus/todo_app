import { type Request, type Response } from "express";
import Tasks from "../models/task.model";

export async function handleAddTask(req: Request, res: Response) {
    try {
        const {
            taskName,
            taskNote,
            deadline = null,
            taskPriority = "low",
        } = req.body;

        const task = await Tasks.create({
            taskName,
            taskNote,
            deadline,
            taskPriority,
            userId: req.user?.id,
        });

        return res.status(201).json({
            status: true,
            message: "Task added Successfully",
            data: task,
        });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
}

export async function handleGetTasks(req: Request, res: Response) {
    try {
        const tasks = await Tasks.find({ userId: req.user?.id });
        return res.status(200).json({
            status: true,
            message: "Tasks fetched successfully",
            data: tasks,
        });
    } catch (errror: any) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
}

export async function handleDeleteTask(req: Request, res: Response) {
    try {
        const { id } = req.params || null;
        if (!id) {
            return res.status(400).json({
                status: false,
                message: "Task id not provided",
            });
        }

        const removeTask = await Tasks.findOneAndDelete({
            _id: id,
            userId: req.user?.id,
        });

        if (!removeTask) {
            return res.status(404).json({
                status: false,
                message: "Invalid Task Id",
            });
        }

        return res.status(200).json({
            status: true,
            message: "Task Removed Successfully",
        });
    } catch (error: any) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
}

export async function handleUpdateTask(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = req.body;

        const updatedData = await Tasks.findOneAndUpdate(
            {
                _id: id,
                userId: req.user?.id,
            },
            {
                $set: data,
            },
        );

        if (!updatedData) {
            return res.status(400).json({
                status: false,
                message: "Failed to Update Task",
            });
        }

        return res.status(200).json({
            status: true,
            message: "Task Updated Successfully",
            data: updatedData,
        });
    } catch (error: any) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
}
