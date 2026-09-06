import mongoose, { Schema } from "mongoose";

interface IComment {
    userId: mongoose.Types.ObjectId;
    taskId: mongoose.Types.ObjectId;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}

const TaskSchema = new Schema<IComment>(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "users",
        },
        taskId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "tasks",
        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true },
);

const Comments = mongoose.model<IComment>("Comments", TaskSchema);

export default Comments;
