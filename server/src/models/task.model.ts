import mongoose, { Schema } from "mongoose";

interface iTask {
    taskName: string;
    taskNote: string;
    isCompleted: boolean;
    deadline: Date;
    taskPriority: 1 | 2 | 3;
    isEdited: boolean;
    userId: mongoose.Types.ObjectId;
    taskLabels: string[];
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
            type: Number,
            enum: [1, 2, 3],
            default: 3,
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
        taskLabels: {
            type: [],
            default: [],
        },
    },
    { timestamps: true },
);

const Tasks = mongoose.model<iTask>("tasks", taskSchema);

export default Tasks;
