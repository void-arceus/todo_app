import {
    useContext,
    createContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";
import {
    handleAddTask,
    handleDeleteTask,
    handleGetTasks,
    handleUpdateTask,
} from "../services/tasks.services";

export interface IUserTasks {
    _id: string;
    taskName: string;
    taskNote: string;
    taskPriority: string;
    isCompleted: boolean;
}

interface ITaskContextInterface {
    userTasks: IUserTasks[];
    deleteTask: (id: string) => void;
    updateTask: (id: string, data: Partial<IUserTasks>) => void;
    addNewTask: (data: IUserTasks) => void;
    getTasks: () => void;
    taskLoading: boolean;
}

interface ITaskProviderProp {
    children: ReactNode;
}

const TaskContext = createContext<ITaskContextInterface | undefined>(undefined);

export function TaskProvider({ children }: ITaskProviderProp) {
    const [userTasks, setUserTasks] = useState<IUserTasks[]>([]);
    const [taskLoading, setTaskLoading] = useState<boolean>(false);

    useEffect(() => {
        getTasks();
    }, []);

    async function deleteTask(id: string) {
        try {
            await handleDeleteTask(id);
            alert("Task deleted successfully");
            setUserTasks((prev) => prev.filter((task) => task._id !== id));
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async function updateTask(id: string, data: Partial<IUserTasks>) {
        try {
            const res = await handleUpdateTask(id, data);
            getTasks();
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async function addNewTask(data: IUserTasks) {
        try {
            const res = await handleAddTask(data);
            setUserTasks((prev) => [...prev, res.data]);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async function getTasks() {
        try {
            setTaskLoading(true);
            const res = await handleGetTasks();
            setUserTasks(
                res.data.sort(
                    (a: IUserTasks, b: IUserTasks) =>
                        Number(a.isCompleted) - Number(b.isCompleted),
                ),
            );
        } catch (error: any) {
            setTaskLoading(false);
            throw new Error(error);
        } finally {
            setTaskLoading(false);
        }
    }

    return (
        <TaskContext.Provider
            value={{
                userTasks,
                addNewTask,
                deleteTask,
                updateTask,
                getTasks,
                taskLoading,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}

export const useTask = (): ITaskContextInterface => {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error("Invalid Context");
    }
    return context;
};
