import TaskTemplate from "./TaskTemplate";
import { handleGetTasks } from "../services/tasks.services";
import { useState, useEffect } from "react";

export interface IUserTasks {
    _id: string;
    taskName: string;
    taskNote: string;
    taskPriority: string;
    isCompleted: boolean;
}

function InboxView() {
    const [userTasks, setUserTasks] = useState<IUserTasks[]>([]);

    useEffect(() => {
        getUserTasks();
    }, []);
    async function getUserTasks() {
        try {
            const res = await handleGetTasks();
            setUserTasks(res.data as IUserTasks[]);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    return (
        <div className="w-full flex flex-col items-center justify-center p-4 gap-2">
            <TaskTemplate menuTitle={"Inbox"} userTasks={userTasks} />
            <div className="w-full max-w-3xl flex items-center justify-start px-2">
                <button className="text-sm text-text-grey font-medium hover:cursor-pointer hover:bg-hover py-1 px-2 rounded-md active:scale-[0.96]">
                    + Add Task
                </button>
            </div>
        </div>
    );
}

export default InboxView;
