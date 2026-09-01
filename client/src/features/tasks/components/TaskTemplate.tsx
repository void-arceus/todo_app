import { type IUserTasks } from "./InboxView";
import TaskList from "./TaskList";

interface ITemplateProps {
    menuTitle: string;
    userTasks: IUserTasks[];
}

function TaskTemplate({ menuTitle, userTasks }: ITemplateProps) {
    return (
        <div className="w-full max-w-3xl flex flex-col items-center justify-center gap-3">
            <div className="w-full flex items-center justify-start">
                <h1 className="text-3xl font-semibold">{menuTitle}</h1>
            </div>
            <TaskList userTasks={userTasks} />
        </div>
    );
}

export default TaskTemplate;
