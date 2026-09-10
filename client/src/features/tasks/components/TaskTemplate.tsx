import TaskList from "./TaskList";

interface ITemplateProps {
    menuTitle: string;
}

function TaskTemplate({ menuTitle }: ITemplateProps) {
    return (
        <div className="w-full max-w-3xl flex flex-col items-center justify-center gap-3">
            <div className="w-full flex items-center justify-start gap-4">
                <div className="flex items-center">
                    <h1 className="text-3xl font-semibold">{menuTitle}</h1>
                </div>

                {/* filtering */}
                <div className="w-full flex items-center justify-end">
                    <h1>Sort:</h1>
                </div>
            </div>
            <TaskList />
        </div>
    );
}

export default TaskTemplate;
