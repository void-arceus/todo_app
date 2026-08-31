interface iLoginData {
    data: {
        email: string;
        password: string;
        rememberme: boolean;
    };
}

export function handleLogin(data: iLoginData) {
    try {
        // call api...
    } catch (error: any) {
        console.error(error);
        throw new Error();
    }
}
