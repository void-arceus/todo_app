import { useToast } from "../../core/Toaster/Context/ToastContext";
import closeIcon from "../../assets/icons/close_icon.png";
import successIcon from "../../assets/icons/success_icon.png";
import failedIcon from "../../assets/icons/failed_icon.png";

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
            <div className="w-full flex items-center justify-between gap-2">
                <div className="flex w-fit ">
                    <img
                        src={toastData.status ? successIcon : failedIcon}
                        alt={
                            toastData.status
                                ? "success_icon.png"
                                : "failed_icon.png"
                        }
                        className="h-4"
                    />
                </div>
                <div className="w-full flex items-center justify-between pr-1">
                    <p
                        className={`${toastData.status ? "text-success" : "text-error"} text-sm font-medium`}
                    >
                        {toastData.message}
                    </p>
                    <button
                        onClick={() => hideToast()}
                        className="text-xs text-text-dark font-medium cursor-pointer"
                    >
                        <img
                            src={closeIcon}
                            alt="close_icon.png"
                            className="h-2"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Toast;
