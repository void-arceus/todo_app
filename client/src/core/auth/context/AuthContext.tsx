import {
    useContext,
    createContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";
import { handleCheckUser } from "../services/auth.server";

interface IUserData {
    username: string;
    email: string;
}

interface IAuthContext {
    isLoggedIn: boolean;
    userData: IUserData | null;
    handleLoggedIn: (val: boolean) => void;
    handleSetUserData: (val: IUserData) => void;
}

interface IAuthContextProps {
    children: ReactNode;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthProvider({ children }: IAuthContextProps) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userData, setUserData] = useState<IUserData | null>(null);

    useEffect(() => {
        if (!isLoggedIn) {
            handleValidateUser();
        }
    }, []);

    async function handleValidateUser() {
        try {
            const res = await handleCheckUser();
            handleLoggedIn(true);
            handleSetUserData(res.data);
        } catch (error: any) {
            handleLoggedIn(false);
            handleSetUserData(null);
        }
    }

    function handleLoggedIn(val: boolean) {
        setIsLoggedIn(val);
    }

    function handleSetUserData(data: IUserData | null) {
        setUserData(data);
    }

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, userData, handleLoggedIn, handleSetUserData }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): IAuthContext => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("Context must be use within and AuthProvider");
    }
    return context;
};
