import { useState, useEffect } from "react";
import TaskList from "./TaskList";
import { useTask } from "../context/TaskContext";

interface ITemplateProps {
    menuTitle: string;
}

function TaskTemplate({ menuTitle }: ITemplateProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const [sortBy, setSortBy] = useState<string>("createdAt");
    const [sortOrder, setSortOrder] = useState<string>("desc");
    const { getTasks } = useTask();

    useEffect(() => {
        handleSortTasks();
    }, [sortBy, sortOrder]);

    async function handleSortTasks() {
        try {
            setLoading(true);
            const params = {
                sortBy: sortBy,
                sortOrder: sortOrder,
            };
            console.log("Sorting params:", params);
            getTasks(params);
        } catch (error: any) {
            throw new Error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full max-w-3xl flex flex-col items-center justify-center gap-3">
            <div className="w-full flex items-center justify-start gap-4">
                <div className="flex items-center">
                    <h1 className="text-3xl font-semibold">{menuTitle}</h1>
                </div>

                {/* filtering */}
                <div className="w-full flex items-center justify-end gap-2">
                    <div className="flex items-center gap-2">
                        <p className="text-xs font-medium text-text-grey">
                            Sort By:
                        </p>
                        <select
                            disabled={loading}
                            onChange={(e) => setSortBy(e.target.value)}
                            defaultValue={sortBy}
                            className="border border-border-primary hover:border-border-hover px-2 py-1.5 rounded-md text-[14px] font-regular text-text-grey hover:cursor-pointer"
                        >
                            <option value="taskPriority">Priority</option>
                            <option value="createdAt">CreatedAt</option>
                            <option value="updatedAt">UpdateAt</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="text-xs font-medium text-text-grey">
                            Sort Order
                        </p>
                        <select
                            disabled={loading}
                            onChange={(e) => setSortOrder(e.target.value)}
                            defaultValue={sortOrder}
                            className="px-2 py-1.5 border border-border-primary hover:border-border-hover rounded-md text-[14px] text-text-grey cursor-pointer"
                        >
                            <option value="asc">Asc</option>
                            <option value="desc">Desc</option>
                        </select>
                    </div>
                </div>
            </div>
            <TaskList />
        </div>
    );
}

export default TaskTemplate;
