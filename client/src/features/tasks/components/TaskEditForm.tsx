import { useState } from "react";
import { useTask } from "../context/TaskContext";
import inboxIcon from "../../../assets/sidebar/inbox_active.png";
import emptyCircleIcon from "../../../assets/icons/empty_circle.png";
import emptyCicleActive from "../../../assets/icons/empty_circle_hover.png";
import menuIcon from "../../../assets/icons/menu_dots.png";
import closeIcon from "../../../assets/icons/close_icon.png";
import Comments from "../comments/Comments";
import editIcon from "../../../assets/icons/edit_icon.png";
import deleteIcon from "../../../assets/icons/delete.png";
import { handleUpdateTask } from "../services/tasks.service";
import { useToast } from "../../../core/Toaster/Context/ToastContext";
import Loading from "../../../components/ui/Loading";
import { type IUserTasks } from "../context/TaskContext";

function TaskEditForm() {
    const {
        handleShowTaskEditForm,
        handleSelectedTaskId,
        handleSetSelectedTask,
        selectedTask,
        selectedTaskId,
        updateTask,
    } = useTask();
    const [isTaskEditing, setIsTaskEditing] = useState<boolean>(false);
    const [selectedTaskName, setSelectedTaskName] = useState<string>("");
    const [selectedTaskNote, setSelectedTaskNote] = useState<string>("");
    const [activeCircleIcon, setActiveCircleIcon] =
        useState<string>(emptyCircleIcon);
    const { handleShowToast } = useToast();
    const [taskEditLoadingState, setTaskEditLoadingState] =
        useState<boolean>(false);

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

    function markCompleted() {
        const data: Partial<IUserTasks> = {
            isCompleted: selectedTask?.isCompleted ? false : true,
        };
        updateTask(selectedTaskId, data);
        const ToastData = {
            message: "",
            status: true,
        };
        if (data.isCompleted) {
            ToastData.message = "Task marked completed";
        } else {
            ToastData.message = "Task marked uncompleted";
        }
        handleShowToast(ToastData);
    }

    return (
        <div className="absolute z-40 w-full h-screen bg-black/30 flex items-center justify-center">
            <div className="w-full h-10/12 flex flex-col max-w-3xl border border-border-primary bg-white shadow-lg rounded-2xl">
                {/* top bar */}
                <div className="w-full flex items-center justify-between border-b border-border-primary px-2 py-2">
                    <div className="flex items-center gap-2">
                        <img
                            src={inboxIcon}
                            alt="inbox_acive.png"
                            className="h-4"
                        />
                        <span className="text-sm font-semibold text-text-dark select-none cursor-pointer">
                            Inbox
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="text-xs text-text-dark font-medium cursor-pointer p-1 rounded-sm active:scale-[0.96]">
                            <img
                                src={menuIcon}
                                alt="menu_dots.png"
                                className="h-3"
                            />
                        </button>
                        <button
                            onClick={() => {
                                handleSelectedTaskId("");
                                handleShowTaskEditForm(false);
                            }}
                            className="text-xs text-text-dark font-medium cursor-pointer p-1 rounded-sm active:scale-[0.96]"
                        >
                            <img
                                src={closeIcon}
                                alt="close_icon.png"
                                className="h-3"
                            />
                        </button>
                    </div>
                </div>
                <div className="w-full flex-1 flex">
                    {/* left */}
                    <div className="h-full w-full border-r border-border-primary py-4 px-4 flex flex-col gap-2">
                        {isTaskEditing ? (
                            <div className="w-full p-2">
                                <div className="w-full p-2 border border-border-hover shadow-sm rounded-xl flex flex-col gap-2">
                                    <div className="w-full flex flex-col">
                                        <input
                                            value={selectedTaskName}
                                            onChange={(e) =>
                                                setSelectedTaskName(
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="task name"
                                            className="w-full outline-0 text-xs text-text-grey font-medium"
                                        />
                                        <input
                                            value={selectedTaskNote}
                                            onChange={(e) =>
                                                setSelectedTaskNote(
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="task note"
                                            className="w-full outline-0 text-xs text-text-grey font-medium"
                                        />
                                    </div>
                                    <div className="w-full flex items-center justify-end gap-2">
                                        <button
                                            onClick={() =>
                                                setIsTaskEditing(false)
                                            }
                                            className="text-xs font-regular text-text-dark hover:cursor-pointer hover:text-text-grey"
                                        >
                                            cancel
                                        </button>
                                        <button
                                            onClick={updateCurrentTask}
                                            className="px-3 py-1.5 rounded-md bg-button-primary hover:bg-button-hover hover:cursor-pointer text-xs font-medium text-text-light shadow-sm hover:shadow-md active:scale-[0.96]"
                                        >
                                            {taskEditLoadingState ? (
                                                <Loading
                                                    size={4}
                                                    color="white"
                                                />
                                            ) : (
                                                <span>Edit</span>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full flex items-start gap-2 border-b border-border-primary py-2 px-2">
                                <button
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
                        )}
                        {/* comments-section */}
                        <Comments />
                    </div>
                    {/* right */}
                    <div className="h-full w-sm p-2 flex flex-col">
                        <div className="flex flex-col gap-2 p-2 border-b border-border-primary">
                            <h1 className="text-xs font-semibold text-text-dark">
                                Projects
                            </h1>
                            <span className="w-full text-xs font-medium text-text-grey hover:bg-hover rounded-md py-2 px-2">
                                Inbox
                            </span>
                        </div>

                        {/* date */}
                        <div className="flex flex-col gap-2 p-2 border-b border-border-primary">
                            <h1 className="text-xs font-semibold text-text-dark">
                                Date
                            </h1>
                            <span className="text-xs font-medium text-text-grey">
                                01 sep
                            </span>
                        </div>

                        {/* priority */}
                        <div className="flex flex-col p-2 gap-2">
                            <h1 className="text-xs font-semibold text-text-dark">
                                Labels
                            </h1>
                            <div className="flex gap-2 flex-wrap">
                                <span className="text-xs font-medium text-text-grey p-1.5 px-3 border border-border-primary hover:border-border-hover hover:cursor-pointer rounded-lg hover:bg-hover hover:shadow-sm select-none active:scale-[0.98]">
                                    Label 1
                                </span>
                                <span className="text-xs font-medium text-text-grey p-1.5 px-3 border border-border-primary hover:border-border-hover hover:cursor-pointer rounded-lg hover:bg-hover hover:shadow-sm select-none active:scale-[0.98]">
                                    Label 2
                                </span>
                                <span className="text-xs font-medium text-text-grey p-1.5 px-3 border border-border-primary hover:border-border-hover hover:cursor-pointer rounded-lg hover:bg-hover hover:shadow-sm select-none active:scale-[0.98]">
                                    Label 3
                                </span>
                                <span className="text-xs font-medium text-text-grey p-1.5 px-3 border border-border-primary hover:border-border-hover hover:cursor-pointer rounded-lg hover:bg-hover hover:shadow-sm select-none active:scale-[0.98]">
                                    Label 4
                                </span>
                                <button className="text-xs px-3 py-1.5 cursor-pointer rounded-lg border border-border-primary hover:border-border-hover hover:bg-hover shadow-sm hover:shadow-md active:scale-[0.98]">
                                    Add New +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskEditForm;
