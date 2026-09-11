import {
    useState,
    useContext,
    createContext,
    type ReactNode,
    useRef,
} from "react";

interface IToastInterface {
    message: string;
    status: boolean;
    isActive?: boolean;
}

interface IToastContextInterface {
    toastData: IToastInterface;
    handleShowToast: (data: IToastInterface) => void;
    hideToast: () => void;
}

interface IToastProviderProps {
    children: ReactNode;
}

const ToastContext = createContext<IToastContextInterface | undefined>(
    undefined,
);

export function ToastProvider({ children }: IToastProviderProps) {
    const [toastData, setToastData] = useState<IToastInterface>({
        message: "",
        status: true,
        isActive: false,
    });
    const toastRef = useRef<number | undefined>(undefined);

    function handleShowToast(data: IToastInterface) {
        clearTimeout(toastRef.current);
        data.isActive = true;
        setToastData(data);
        toastRef.current = setTimeout(() => {
            setToastData((prev) => ({ ...prev, message: "", isActive: false }));
            setTimeout(() => {
                setToastData((prev) => ({ ...prev, status: false }));
            }, 300);
        }, 2000);
    }

    function hideToast() {
        setToastData((prev) => ({ ...prev, message: "", isActive: false }));
        setTimeout(() => {
            setToastData((prev) => ({ ...prev, status: false }));
        }, 300);
    }

    return (
        <ToastContext.Provider
            value={{ toastData, handleShowToast, hideToast }}
        >
            {children}
        </ToastContext.Provider>
    );
}

export const useToast = (): IToastContextInterface => {
    const context = useContext(ToastContext);
    if (context === undefined) throw new Error("Toast context not defined");
    return context;
};
