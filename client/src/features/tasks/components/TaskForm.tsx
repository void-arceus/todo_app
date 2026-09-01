import { useState } from "react";
import submitIcon from "../../../assets/icons/up_icon.png";
import cancelIcon from "../../../assets/icons/close_icon.png";

interface ITaskFormProps {
    handleDisplayTaskForm: () => void;
}

function TaskForm({ handleDisplayTaskForm }: ITaskFormProps) {
    const [taskTitle, setTaskTitle] = useState<string>("");
    const [taskDescription, setTaskDescription] = useState<string>("");

    return (
        <main
            onClick={() => {
                handleDisplayTaskForm();
            }}
            className="bg-black/20 h-screen w-full z-50 p-4 flex flex-col items-center absolute"
        >
            <div className="h-30" />
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-bg-primary border border-border-hover rounded-2xl shadow-xl p-4 flex flex-col items-end justify-start gap-2"
            >
                <div className="w-full flex flex-col items-start">
                    <input
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        placeholder="Add a task..."
                        className="w-full outline-0 placeholder:text-sm text-text-grey text-sm"
                    />
                    {taskTitle.length > 0 ? (
                        <div className="w-full">
                            <input
                                value={taskDescription}
                                onChange={(e) =>
                                    setTaskDescription(e.target.value)
                                }
                                placeholder="Description"
                                className="w-full text-xs text-text-grey outline-0"
                            />
                        </div>
                    ) : null}
                </div>
                <div className="flex items-center justify-end gap-1">
                    <button
                        onClick={() => handleDisplayTaskForm()}
                        className="p-2 hover:bg-active hover:cursor-pointer rounded-md active:scale-[0.96]"
                    >
                        <img
                            src={cancelIcon}
                            alt="cancelIcon"
                            className="h-2 w-2 active:scale-[0.96] cursor-pointer"
                        />
                    </button>
                    <button className="bg-hover p-2 border border-border-hover rounded-sm hover:bg-active active:scale-[0.96] cursor-pointer">
                        <img
                            src={submitIcon}
                            alt="submitIcon"
                            className="h-2 w-2 active:scale-[0.96] cursor-pointer"
                        />
                    </button>
                </div>
            </div>
        </main>
    );
}

export default TaskForm;
