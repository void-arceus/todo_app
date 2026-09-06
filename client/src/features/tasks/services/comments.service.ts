import axios from "axios";
const BASE_URL = import.meta.env.VITE_SERVER_URL;

export interface ICommentData {
    id?: string;
    taskId: string;
    message: string;
}

export async function addComment(data: ICommentData) {
    try {
        const res = await axios.post(`${BASE_URL}/v1/comments`, data);
        return res.data.data;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getComments(id: string) {
    id = "6a96a1e3096b2dd87a632362";
    try {
        const res = await axios.get(`${BASE_URL}/v1/comments/${id}`);
        return res.data.data;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function updateComment(data: ICommentData) {
    try {
        const res = await axios.patch(
            `${BASE_URL}/v1/comments/${data.id}`,
            data,
        );
        return res.data.data;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function deleteComment(id: string) {
    try {
        await axios.delete(`${BASE_URL}/v1/comments/${id}`);
    } catch (error: any) {
        throw new Error(error);
    }
}
