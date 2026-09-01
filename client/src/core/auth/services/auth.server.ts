import axios from "axios";
import { type LoginInputs } from "../components/Login";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export async function handleLogin(data: LoginInputs) {
    try {
        const res = await axios.post(`${BASE_URL}/v1/auth/login`, data);
        return res.data;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function handleCheckUser() {
    try {
        const res = await axios.get(`${BASE_URL}/v1/auth/me`);
        console.log("Result:", res);
        return res.data;
    } catch (error: any) {
        throw new Error(error);
    }
}
