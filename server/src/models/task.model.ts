import mongoose, { Schema } from "mongoose";

interface iTask {
    taskName: string;
    taskNote: string;
    isCompleted: boolean;
    deadline: Date;
    taskPriority: "low" | "medium" | "high";
    userId: mongoose.Types.ObjectId;
}

const taskSchema = new Schema<iTask>({
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
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
});

const Tasks = mongoose.model<iTask>("tasks", taskSchema);

export default Tasks;
