import axios from "axios";
const BASE_URL = import.meta.env.VITE_SERVER_URL;

export interface IPostCommentData {
    id?: string;
    taskId: string;
    comment: string;
}

export async function addComment(data: IPostCommentData) {
    try {
        const res = await axios.post(`${BASE_URL}/v1/comments`, data);
        return res.data;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getComments(id: string) {
    try {
        const res = await axios.get(`${BASE_URL}/v1/comments/${id}`);
        return res.data;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function updateComment(data: IPostCommentData) {
    try {
        const res = await axios.patch(
            `${BASE_URL}/v1/comments/${data.id}`,
            data,
        );
        return res.data;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function deleteComment(id: string, taskId: string) {
    try {
        const data = {
            taskId: taskId,
        };
        const res = await axios.delete(`${BASE_URL}/v1/comments/${id}`, {
            data,
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error);
    }
}
