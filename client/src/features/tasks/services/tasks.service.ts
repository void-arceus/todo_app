import axios from "axios";
import { type ITaskInput } from "../components/TaskForm";
import type { IUserTasks } from "../context/TaskContext";
const BASE_URL = import.meta.env.VITE_SERVER_URL;

export async function handleAddTask(data: ITaskInput) {
    try {
        const res = await axios.post(`${BASE_URL}/v1/task/task`, data);
        return res.data;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function handleGetTasks() {
    try {
        const res = await axios.get(`${BASE_URL}/v1/task/tasks`);
        return res.data;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function handleDeleteTask(id: string) {
    try {
        await axios.delete(`${BASE_URL}/v1/task/task/${id}`);
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function handleUpdateTask(id: string, data: Partial<IUserTasks>) {
    try {
        const res = await axios.patch(`${BASE_URL}/v1/task/task/${id}`, data);
        return res.data;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function handleLogout() {
    try {
        await axios.post(`${BASE_URL}/v1/auth/logout`);
    } catch (error: any) {
        throw new Error(error);
    }
}
