import { Request, Response } from "express";
import Comments from "../models/comment.model";

export async function handleAddComment(
    req: Request,
    res: Response,
): Promise<Response> {
    try {
        const { taskId, comment } = req.body;
        console.log("taskId:", taskId);
        console.log("comment message:", comment);
        if (
            !taskId ||
            !comment ||
            taskId.trim() === "" ||
            comment.trim() === ""
        ) {
            return res.status(400).json({
                status: false,
                message: "Missing credentials",
            });
        }

        const newComment = await Comments.create({
            userId: req.user?.id,
            taskId,
            message: comment,
        });

        console.log("Comment data:", newComment);

        return res.status(201).json({
            status: true,
            message: "Comment posted successfully",
            data: { newComment: newComment },
        });
    } catch (error: any) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
}

export default async function handleUpdateComment(
    req: Request,
    res: Response,
): Promise<Response> {
    try {
        const { taskId, comment } = req.body;
        const { id } = req.params; // comment id

        // update comment if it exists
        const date = new Date();
        const updatedComment = await Comments.findOneAndUpdate(
            { _id: id, taskId: taskId, userId: req.user?.id },
            { message: comment, updatedAt: date, isEdited: true },
        );

        if (!updatedComment) {
            return res.status(404).json({
                status: false,
                message: "Invalid Comment Id",
            });
        }

        return res.status(200).json({
            status: true,
            message: "Comment updated",
            data: { comment: updatedComment },
        });
    } catch (error: any) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
}

export async function handleDeleteComment(
    req: Request,
    res: Response,
): Promise<Response> {
    try {
        const { taskId } = req.body;
        const { id } = req.params;

        if (!taskId || !id) {
            return res.status(400).json({
                status: false,
                message: "Task ID or Comment ID not provided or Invalid",
            });
        }

        const removeComment = await Comments.findOneAndDelete({
            _id: id,
            taskId: taskId,
            userId: req.user?.id,
        });

        if (!removeComment) {
            return res.status(404).json({
                status: false,
                message: "Invalid comment credentials",
            });
        }

        return res.status(200).json({
            status: true,
            message: "Comment Removed",
        });
    } catch (error: any) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
}

export async function handleGetComments(
    req: Request,
    res: Response,
): Promise<Response> {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                status: false,
                message: "Task ID is required",
            });
        }

        const comments = await Comments.find({
            taskId: id,
        });

        return res.status(comments.length === 0 ? 204 : 200).json({
            status: true,
            message:
                comments.length === 0
                    ? "No comments found"
                    : "Comments fetched successfully",
            data: { comments: comments },
        });
    } catch (error: any) {
        return res.status(500).json({
            status: true,
            message: "Internal Server Error",
        });
    }
}
