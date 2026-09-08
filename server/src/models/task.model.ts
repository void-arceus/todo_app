import mongoose, { Schema } from "mongoose";

interface iTask {
    taskName: string;
    taskNote: string;
    isCompleted: boolean;
    deadline: Date;
    taskPriority: "low" | "medium" | "high";
    isEdited: boolean;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const taskSchema = new Schema<iTask>(
    {
        taskName: {
            required: true,
            type: String,
            trim: true,
        },
        taskNote: {
            type: String,
            trim: true,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        deadline: {
            type: Date,
        },
        taskPriority: {
            type: String,
            enum: ["high", "medium", "low"],
        },
        isEdited: {
            type: Boolean,
            default: false,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
    },
    { timestamps: true },
);

const Tasks = mongoose.model<iTask>("tasks", taskSchema);

export default Tasks;
