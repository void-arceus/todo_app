import { useState } from "react";
import { type IUserTasks } from "./InboxView";
import emptyCircle from "../../../assets/icons/empty_circle.png";
import emptyCircleHover from "../../../assets/icons/empty_circle_hover.png";
import editIcon from "../../../assets/icons/edit_icon.png";
import deleteIcon from "../../../assets/icons/delete.png";
import commentIcon from "../../../assets/icons/comment.png";

interface ITaskItemProps {
    taskData: IUserTasks;
}

function TaskItem({ taskData }: ITaskItemProps) {
    const [circleImage, setCircleImage] = useState<string>(emptyCircle);
    return (
        <div
            key={taskData?._id}
            className="w-full border-b border-b-border-primary last:border-b-0 py-2"
        >
            <div className="w-full flex items-start justify-start gap-2">
                <div className="h-5">
                    <button
                        onMouseEnter={() => {
                            setCircleImage(emptyCircleHover);
                        }}
                        onMouseLeave={() => {
                            setCircleImage(emptyCircle);
                        }}
                        className="hover:cursor-pointer pt-1.5 h-5"
                    >
                        <img
                            src={circleImage}
                            alt="empty_circle.png"
                            className="h-5 object-fit"
                        />
                    </button>
                </div>
                <div className="flex flex-col items-start justify-start">
                    <h1 className="text-md font-medium text-text-dark">
                        {taskData?.taskName}
                    </h1>
                    <p className="text-xs font-regular text-text-grey">
                        {taskData?.taskNote}
                    </p>
                </div>
            </div>
            <div className="w-full flex items-center justify-end gap-3">
                <button className="hover:cursor-pointer">
                    <img src={editIcon} className="h-4 w-4" />
                </button>
                <button className="hover:cursor-pointer">
                    <img src={commentIcon} className="h-4 w-4" />
                </button>
                <button className="hover:cursor-pointer">
                    <img src={deleteIcon} className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}

export default TaskItem;
