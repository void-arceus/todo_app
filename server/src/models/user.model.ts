import mongoose, { Schema } from "mongoose";

interface iUser {
    username: String;
    email: String;
    password: String;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<iUser>(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

const User = mongoose.model<iUser>("users", userSchema);
export default User;
