import { useState } from "react";
import { type IUserTasks } from "./InboxView";
import TaskItem from "./TaskItem";

interface ITaskListProps {
    userTasks: IUserTasks[];
}

function TaskList({ userTasks }: ITaskListProps) {
    return (
        <div className="w-full flex flex-col items-start justify-center border-t border-t-border-primary border-b border-b-border-primary">
            {userTasks.length > 0 ? (
                userTasks.map((task) => (
                    <TaskItem key={task?._id} taskData={task} />
                ))
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default TaskList;
