import { type ICommentData } from "../taskEditComponents/Comments";
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
} from "../services/tasks.service";

export interface IUserTasks {
    _id: string;
    taskName: string;
    taskNote: string;
    taskPriority: number;
    isCompleted: boolean;
    isEdited: boolean;
    taskComments: ICommentData[];
    taskLabels: string[];
    createdAt: Date;
    updatedAt: Date;
}

interface ITaskContextInterface {
    userTasks: IUserTasks[];
    deleteTask: (id: string) => void;
    updateTask: (id: string, data: Partial<IUserTasks>) => void;
    addNewTask: (data: IUserTasks) => void;
    getTasks: (params?: { sortBy: string; sortOrder: string }) => void;
    taskLoading: boolean;
    showTaskEditForm: boolean;
    handleShowTaskEditForm: (val: boolean) => void;
    selectedTaskId: string;
    handleSelectedTaskId: (val: string) => void;
    selectedTask: IUserTasks | null;
    handleSetSelectedTask: (val: IUserTasks) => void;
}

interface ITaskProviderProp {
    children: ReactNode;
}

const TaskContext = createContext<ITaskContextInterface | undefined>(undefined);

export function TaskProvider({ children }: ITaskProviderProp) {
    const [userTasks, setUserTasks] = useState<IUserTasks[]>([]);
    const [taskLoading, setTaskLoading] = useState<boolean>(false);
    const [showTaskEditForm, setShowTaskEditForm] = useState<boolean>(false);
    const [selectedTaskId, setSelectedTaskId] = useState<string>("");
    const [selectedTask, setSelectedTask] = useState<IUserTasks | null>(null);

    useEffect(() => {
        getTasks();
    }, []);

    function handleSetSelectedTask(val: IUserTasks) {
        setSelectedTask(val);
        setUserTasks((prev) =>
            prev.map((p) => {
                if (p._id === val._id) {
                    return val;
                }
                return p;
            }),
        );
    }

    function handleSelectedTaskId(id: string) {
        setSelectedTaskId(id);
    }

    function handleShowTaskEditForm(val: boolean) {
        setShowTaskEditForm(val);
    }

    async function deleteTask(id: string) {
        try {
            setTaskLoading(true);
            await handleDeleteTask(id);
            setUserTasks((prev) => prev.filter((task) => task._id !== id));
        } catch (error: any) {
            setTaskLoading(false);
            throw new Error(error);
        } finally {
            setTaskLoading(false);
        }
    }

    async function updateTask(id: string, data: Partial<IUserTasks>) {
        try {
            setTaskLoading(true);
            const res = await handleUpdateTask(id, data);
            handleSetSelectedTask(res.data?.updatedData);
            setUserTasks((prev) =>
                prev.map((p) => {
                    if (p._id === selectedTaskId) {
                        return res.data?.updatedData;
                    }
                    return p;
                }),
            );
            getTasks();
        } catch (error: any) {
            setTaskLoading(false);
            throw new Error(error);
        } finally {
            setTaskLoading(false);
        }
    }

    async function addNewTask(data: IUserTasks) {
        try {
            setTaskLoading(true);
            const res = await handleAddTask(data);
            setUserTasks((prev) => [...prev, res.data]);
        } catch (error: any) {
            setTaskLoading(false);
            throw new Error(error);
        } finally {
            setTaskLoading(false);
        }
    }

    async function getTasks(params?: { sortBy: string; sortOrder: string }) {
        try {
            setTaskLoading(true);
            const res = await handleGetTasks(params);
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
                showTaskEditForm,
                handleShowTaskEditForm,
                selectedTaskId,
                handleSelectedTaskId,
                selectedTask,
                handleSetSelectedTask,
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
