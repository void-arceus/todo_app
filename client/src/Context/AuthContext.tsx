import { useContext, createContext, useState, type ReactNode } from "react";

interface IAuthContext {
    isLoggedIn: boolean;
    handleLoggedIn: (val: boolean) => void;
}

interface IAuthContextProps {
    children: ReactNode;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthProvider({ children }: IAuthContextProps) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    console.log("Is logged in:", isLoggedIn);
    function handleLoggedIn(val: boolean) {
        setIsLoggedIn(val);
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, handleLoggedIn }}>
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
