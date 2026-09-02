import TaskItem from "./TaskItem";
import { useTask } from "../context/TaskContext";

function TaskList() {
    const { userTasks } = useTask();
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
