import { useState } from "react";
import { type IUserTasks } from "../context/TaskContext";
import editIcon from "../../../assets/icons/edit_icon.png";
import deleteIcon from "../../../assets/icons/delete.png";
import commentIcon from "../../../assets/icons/comment.png";
import { useTask } from "../context/TaskContext";
import filledCheckBox from "../../../assets/icons/checkbox.png";
import emptyCheckBox from "../../../assets/icons/unchecked.png";
import { useToast } from "../../../core/Toaster/Context/ToastContext";

interface ITaskItemProps {
    taskData: IUserTasks;
}

function TaskItem({ taskData }: ITaskItemProps) {
    const [checkBox, setCheckBox] = useState<string>(emptyCheckBox);
    const {
        deleteTask,
        updateTask,
        handleShowTaskEditForm,
        handleSelectedTaskId,
        handleSetSelectedTask,
    } = useTask();
    const { handleShowToast } = useToast();

    function markCompleted() {
        const data: Partial<IUserTasks> = {
            isCompleted: taskData.isCompleted ? false : true,
        };
        updateTask(taskData?._id, data);
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

    function handleDisplayEditForm(flag: boolean, id: string) {
        handleShowTaskEditForm(flag);
        handleSelectedTaskId(id);
    }

    function formatDate(myDate: Date) {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        };
        const customDate = new Date(myDate).toLocaleDateString(
            "en-US",
            options as any,
        );
        return customDate;
    }

    return (
        <div
            key={taskData?._id}
            className="w-full border-b border-b-border-primary last:border-b-0 py-2 flex flex-col gap-1"
        >
            <div className="w-full flex flex-col">
                <div className="w-full flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <p className="text-[12px] text-text-grey font-semibold">
                            Created At:
                        </p>
                        <span className="text-[12px] font-medium text-text-grey">
                            {formatDate(taskData?.createdAt)}
                        </span>
                    </div>
                    {taskData?.isEdited ? (
                        <div className="flex items-center gap-2">
                            <p className="text-[12px] font-semibold text-text-grey">
                                (Edited:
                            </p>
                            <span className="text-[12px] font-medium text-text-grey">
                                {formatDate(taskData?.updatedAt)})
                            </span>
                        </div>
                    ) : null}
                </div>
                <div className="w-full flex items-start justify-start gap-2">
                    <div className="h-5">
                        <button
                            onClick={markCompleted}
                            onMouseEnter={() => {
                                setCheckBox(filledCheckBox);
                            }}
                            onMouseLeave={() => {
                                setCheckBox(emptyCheckBox);
                            }}
                            className="hover:cursor-pointer pt-1 h-5"
                        >
                            <img
                                src={
                                    taskData.isCompleted
                                        ? filledCheckBox
                                        : checkBox
                                }
                                alt="empty_circle.png"
                                className="h-5 object-fit"
                            />
                        </button>
                    </div>
                    <div className="w-full flex items-center justify-between">
                        <div
                            onClick={() => {
                                handleSetSelectedTask(taskData as IUserTasks);
                                handleDisplayEditForm(true, taskData._id);
                            }}
                            className="w-full cursor-pointer"
                        >
                            <h1
                                className={`${taskData.isCompleted ? "text-text-grey line-through" : "text-text-dark"} text-sm font-regular`}
                            >
                                {taskData?.taskName}
                            </h1>
                            <p
                                className={`${taskData.isCompleted ? "line-through" : ""} text-xs font-regular text-text-grey`}
                            >
                                {taskData?.taskNote}
                            </p>
                        </div>
                        <div className="w-25 flex items-center justify-end pl-2 gap-3">
                            <button
                                onClick={() => {
                                    handleSetSelectedTask(
                                        taskData as IUserTasks,
                                    );
                                    handleDisplayEditForm(true, taskData._id);
                                }}
                                className="hover:cursor-pointer"
                            >
                                <img src={editIcon} className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() =>
                                    handleDisplayEditForm(true, taskData._id)
                                }
                                className="hover:cursor-pointer"
                            >
                                <img src={commentIcon} className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => deleteTask(taskData._id)}
                                className="hover:cursor-pointer"
                            >
                                <img src={deleteIcon} className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* labels */}
            <div className="w-full">
                <div className="flex items-center gap-2 pl-7">
                    <span className="text-xs font-semibold text-text-grey">
                        {taskData?.taskComments?.length}
                    </span>
                    <img
                        src={commentIcon}
                        alt="comment_icon.png"
                        className="h-3"
                    />
                </div>
            </div>
        </div>
    );
}

export default TaskItem;
