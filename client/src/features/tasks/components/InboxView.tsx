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
        <div className="w-full flex items-center justify-center p-4">
            <TaskTemplate menuTitle={"Inbox"} userTasks={userTasks} />
        </div>
    );
}

export default InboxView;
