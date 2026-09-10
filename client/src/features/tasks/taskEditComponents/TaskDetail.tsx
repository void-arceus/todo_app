import { useState } from "react";
import Comments from "./Comments";
import emptyCicleActive from "../../../assets/icons/empty_circle_hover.png";
import editIcon from "../../../assets/icons/edit_icon.png";
import emptyCircleIcon from "../../../assets/icons/empty_circle.png";
import Loading from "../../../components/ui/Loading";
import { useToast } from "../../../core/Toaster/Context/ToastContext";
import { useTask } from "../context/TaskContext";
import { handleUpdateTask } from "../services/tasks.service";

interface TaskDetailProps {
    formatDate: (val: Date) => string;
}

function TaskDetail({ formatDate }: TaskDetailProps) {
    const [isTaskEditing, setIsTaskEditing] = useState<boolean>(false);
    const [selectedTaskName, setSelectedTaskName] = useState<string>("");
    const [selectedTaskNote, setSelectedTaskNote] = useState<string>("");
    const [activeCircleIcon, setActiveCircleIcon] =
        useState<string>(emptyCircleIcon);
    const [taskEditLoadingState, setTaskEditLoadingState] =
        useState<boolean>(false);
    const { handleSetSelectedTask, selectedTask, selectedTaskId } = useTask();

    const { handleShowToast } = useToast();

    async function updateCurrentTask() {
        if (!selectedTaskName || selectedTaskName === "") {
            handleShowToast({
                message: "Task name cannot be empty!",
                status: false,
            });
            return;
        }
        try {
            setTaskEditLoadingState(true);
            const data = {
                taskName: selectedTaskName,
                taskNote: selectedTaskNote,
                isEdited: true,
                updatedAt: new Date(),
            };
            const res = await handleUpdateTask(selectedTaskId, data);
            if (res?.status) {
                const updatedData = res.data?.updatedData;
                handleSetSelectedTask(updatedData);
                setIsTaskEditing(false);
                handleShowToast({
                    message: "Task updated succesfully!",
                    status: true,
                });
            } else {
                handleShowToast({
                    message: "Failed to update task!",
                    status: false,
                });
            }
        } catch (error: any) {
            throw new Error(error);
        } finally {
            setTaskEditLoadingState(false);
        }
    }

    async function updateTaskStatus() {
        try {
            const status = selectedTask?.isCompleted;
            const data = {
                isCompleted: status ? false : true,
                updatedAt: new Date(),
            };
            const res = await handleUpdateTask(selectedTaskId, data);
            if (res?.status) {
                handleSetSelectedTask(res?.data?.updatedData);
                const message = data?.isCompleted
                    ? "Task marked Completed!"
                    : "Task mark incompleted!";
                handleShowToast({ message, status: true });
            } else {
                handleShowToast({
                    message: "Failed to update task",
                    status: false,
                });
            }
        } catch (error: any) {
            throw new Error(error);
        }
    }

    return (
        <div className="h-full w-full border-r border-border-primary py-4 px-4 flex flex-col gap-2">
            {isTaskEditing ? (
                <div className="w-full p-2">
                    <div className="w-full p-2 border border-border-hover shadow-sm rounded-xl flex flex-col gap-2">
                        <div className="w-full flex flex-col">
                            <input
                                value={selectedTaskName}
                                onChange={(e) =>
                                    setSelectedTaskName(e.target.value)
                                }
                                placeholder="task name"
                                className="w-full outline-0 text-xs text-text-grey font-medium"
                            />
                            <input
                                value={selectedTaskNote}
                                onChange={(e) =>
                                    setSelectedTaskNote(e.target.value)
                                }
                                placeholder="task note"
                                className="w-full outline-0 text-xs text-text-grey font-medium"
                            />
                        </div>
                        <div className="w-full flex items-center justify-end gap-2">
                            <button
                                onClick={() => setIsTaskEditing(false)}
                                className="text-xs font-regular text-text-dark hover:cursor-pointer hover:text-text-grey"
                            >
                                cancel
                            </button>
                            <button
                                onClick={updateCurrentTask}
                                className="px-3 py-1.5 rounded-md bg-button-primary hover:bg-button-hover hover:cursor-pointer text-xs font-medium text-text-light shadow-sm hover:shadow-md active:scale-[0.96]"
                            >
                                {taskEditLoadingState ? (
                                    <Loading size={4} color="white" />
                                ) : (
                                    <span>Edit</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full flex flex-col items-start border-b border-border-primary py-2 px-2">
                    <div className="px-6">
                        <span
                            className={`${selectedTask?.taskPriority === 3 ? "text-green-600 bg-green-100" : selectedTask?.taskPriority === 2 ? "text-yellow-600 bg-yellow-100" : "text-red-600 bg-red-100"} capitalize text-xs font-semibold px-3 py-1 rounded-sm`}
                        >
                            {selectedTask?.taskPriority === 1
                                ? "High"
                                : selectedTask?.taskPriority === 2
                                  ? "Medium"
                                  : "Low"}
                        </span>
                    </div>
                    <div className="w-full flex items-start gap-2">
                        <button
                            onClick={updateTaskStatus}
                            onMouseEnter={() =>
                                setActiveCircleIcon(emptyCicleActive)
                            }
                            onMouseLeave={() =>
                                setActiveCircleIcon(emptyCircleIcon)
                            }
                            className="hover:cursor-pointer pt-1"
                        >
                            <img
                                src={
                                    selectedTask?.isCompleted
                                        ? emptyCicleActive
                                        : activeCircleIcon
                                }
                                alt="empty_circle.png"
                                className="h-4"
                            />
                        </button>
                        <div className="w-full h-full flex items-start justify-between">
                            <div className="flex flex-col w-full">
                                <span
                                    className={`${selectedTask?.isCompleted ? "line-through text-text-grey" : ""} text-sm text-text-dark font-medium`}
                                >
                                    {selectedTask?.taskName}
                                </span>
                                <span
                                    className={`${selectedTask?.isCompleted ? "line-through" : ""} text-xs font-medium text-text-grey`}
                                >
                                    {selectedTask?.taskNote}
                                </span>
                            </div>
                            <div className="h-full w-5 flex items-center justify-end">
                                <button
                                    onClick={() => {
                                        setSelectedTaskName(
                                            selectedTask?.taskName as string,
                                        );
                                        setSelectedTaskNote(
                                            selectedTask?.taskNote as string,
                                        );
                                        setIsTaskEditing(true);
                                    }}
                                    className="cursor:pointer active:scale-[0.96]"
                                >
                                    <img
                                        src={editIcon}
                                        alt="edit_icon.png"
                                        className="h-4 hover:cursor-pointer active:scale-[0.96]"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* comments-section */}
            <Comments formatDate={formatDate} />
        </div>
    );
}

export default TaskDetail;
