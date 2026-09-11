import { useConfirmation } from "../../core/confirmation/context/ConfirmationContext";
import Loading from "./Loading";

function Confirmation() {
    const { confirmData, handleConfirmTask, loading } = useConfirmation();

    return (
        <main
            className={`${confirmData.show ? "flex" : "hidden"} absolute h-screen w-full flex flex-col items-center z-70 bg-black/30`}
        >
            <div className="h-40" />
            <div className="w-sm max-w-md bg-white border border-border-primary shadow-md rounded-2xl flex flex-col items-center justify-center gap-2 py-8 px-4">
                <p className="text-sm text-text-dark font-medium text-center">
                    {confirmData.message}
                </p>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => handleConfirmTask(false)}
                        className="text-xs font-semibold text-text-dark hover:cursor-pointer px-3 py-1.5 hover:bg-hover rounded-md active:scale-[0.96]"
                    >
                        No
                    </button>
                    <button
                        onClick={() => handleConfirmTask(true)}
                        className="text-sm text-text-light font-medium px-3 py-1.5 rounded-md bg-button-primary hover:bg-button-hover hover:cursor-pointer shadow-sm hove:shadow-md active:scale-[0.96]"
                    >
                        {loading ? <Loading size={4} color="white" /> : "Yes"}
                    </button>
                </div>
            </div>
        </main>
    );
}

export default Confirmation;
