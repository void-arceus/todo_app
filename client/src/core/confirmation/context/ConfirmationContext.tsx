import { useState, useContext, createContext, type ReactNode } from "react";

interface IConfirmationProps {
    children: ReactNode;
}

interface IConfirmData {
    show: boolean;
    message: string;
}

interface IConfirmationInterface {
    confirmData: IConfirmData;
    loading: boolean;
    handleConfirmTask: (val: boolean) => void;
    displayConfirmationBox: (message: string, fn: () => void) => void;
}

const ConfirmationContext = createContext<IConfirmationInterface | undefined>(
    undefined,
);

export default function ConfirmationProvider({ children }: IConfirmationProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const [confirmData, setConfirmData] = useState<IConfirmData>({
        show: false,
        message: "",
    });
    const [callBack, setCallBack] = useState<(() => void) | undefined>();

    async function handleConfirmTask(val: boolean) {
        try {
            if (val) {
                setLoading(true);
                callBack?.();
                setCallBack(undefined);
            }
            setConfirmData({ show: false, message: "" });
        } catch (error: any) {
            throw new Error(error);
        } finally {
            setLoading(false);
        }
    }

    function displayConfirmationBox(message: string, fn: () => void) {
        setConfirmData({ show: true, message: message });
        setCallBack(() => fn);
    }

    return (
        <ConfirmationContext.Provider
            value={{
                confirmData,
                loading,
                handleConfirmTask,
                displayConfirmationBox,
            }}
        >
            {children}
        </ConfirmationContext.Provider>
    );
}

export const useConfirmation = (): IConfirmationInterface => {
    const context = useContext(ConfirmationContext);
    if (context === undefined)
        throw new Error("Undefined confirmation context");
    return context;
};
