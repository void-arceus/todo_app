import axios from "axios";
const BASE_URL = import.meta.env.VITE_SERVER_URL;

const data = {
    taskId;
};

export async function addComment() {
    try {
        const res = await axios.post(`${BASE_URL}/`, data);
    } catch (error: any) {
        throw new Error(error);
    }
}
