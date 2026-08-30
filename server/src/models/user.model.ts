import mongoose, { Schema } from "mongoose";

interface iUser {
    username: String;
    email: String;
    password: String;
}

const userSchema = new Schema<iUser>({
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
});

const User = mongoose.model<iUser>("users", userSchema);
export default User;
