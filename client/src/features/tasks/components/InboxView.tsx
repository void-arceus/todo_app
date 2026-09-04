import TaskTemplate from "./TaskTemplate";
import { useState } from "react";
import { useToast } from "../../../core/Toaster/Context/ToastContext";
import Loading from "../../../components/ui/Loading";
import { useTask, type IUserTasks } from "../context/TaskContext";

function InboxView() {
    const [showInputBox, setShowInputBox] = useState<boolean>(false);
    const [taskTitle, setTaskTitle] = useState<string>("");
    const [taskDescription, setTaskDescription] = useState<string>("");
    const { handleShowToast } = useToast();
    const { taskLoading, addNewTask } = useTask();

    async function addTask() {
        if (!taskTitle || taskTitle.trim() === "") {
            handleShowToast({
                message: "Task name cannot be empty",
                status: false,
            });
            return;
        }
        const data = {
            taskName: taskTitle,
            taskNote: taskDescription,
            taskPriority: "low",
        };
        try {
            addNewTask(data as IUserTasks);
            handleShowToast({
                message: "Task Added Successfully",
                status: true,
            });
            setTaskTitle("");
            setTaskDescription("");
        } catch (error: any) {
            handleShowToast({
                message: "Failed to add task",
                status: false,
            });
            throw new Error(error);
        }
    }

    return (
        <div className="w-full max-w-3xl flex flex-col items-center justify-center p-4 gap-2">
            <TaskTemplate menuTitle={"Inbox"} />
            <div className="w-full max-w-3xl flex items-center justify-start">
                {showInputBox ? (
                    <div className="w-full border border-border-primary p-3 rounded-xl flex flex-col items-start justify-center gap-2 shadow-md hover:border-border-hover">
                        <div className="w-full">
                            <input
                                value={taskTitle}
                                onChange={(e) => setTaskTitle(e.target.value)}
                                placeholder="TaskName"
                                className="w-full text-sm text-text-grey outline-0 text-medium"
                            />
                            {taskTitle.length > 0 && taskTitle.trim() !== "" ? (
                                <input
                                    value={taskDescription}
                                    onChange={(e) =>
                                        setTaskDescription(e.target.value)
                                    }
                                    placeholder="Note"
                                    className="w-full outline-0 text-xs text-text-grey"
                                />
                            ) : null}
                        </div>
                        <div className="w-full flex items-center justify-end gap-3">
                            <button
                                onClick={() => {
                                    setShowInputBox(false);
                                }}
                                className="text-xs font-medium text-text-grey hover:cursor-pointer hover:text-text-dark"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    addTask();
                                }}
                                className="text-sm font-medium text-text-light bg-button-primary hover:bg-button-hover px-3.5 py-1.5 rounded-sm cursor-pointer hover:shadow-md active:scale-[0.96]"
                            >
                                {taskLoading ? (
                                    <Loading size={4} color="white" />
                                ) : (
                                    "Add"
                                )}
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => {
                            setShowInputBox(true);
                        }}
                        className="text-xs text-text-grey font-medium hover:cursor-pointer hover:text-text-dark py-2 px-3 rounded-md"
                    >
                        + Add Task
                    </button>
                )}
            </div>
        </div>
    );
}

export default InboxView;
