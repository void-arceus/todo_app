import { useToast } from "../../core/Toaster/Context/ToastContext";

function Toast() {
    const { toastData, hideToast } = useToast();
    return (
        <div
            className={`fixed z-50 w-full max-w-xs top-5 left-1/2 p-2 rounded-lg shadow-md bg-white border border-border-primary transition-all duration-300 ease-in-out transform -translate-x-1/2 ${toastData.status ? "shadow-green-100" : "shadow-red-100"} ${
                toastData.isActive
                    ? "translate-y-0 opacity-100 scale-100 pointer-events-auto"
                    : "-translate-y-10 opacity-0 scale-95 pointer-events-none"
            }`}
        >
            <div className="w-full flex items-center justify-between">
                <p
                    className={`${toastData.status ? "text-success" : "text-error"} text-sm font-medium`}
                >
                    {toastData.message}
                </p>
                <button
                    onClick={() => hideToast()}
                    className="text-xs text-text-dark font-medium cursor-pointer"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default Toast;
