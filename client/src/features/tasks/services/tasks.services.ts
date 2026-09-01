import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export async function handleGetTasks() {
    try {
        const res = await axios.get(`${BASE_URL}/v1/task/tasks`);
        return res.data;
    } catch (error: any) {
        throw new Error(error);
    }
}
