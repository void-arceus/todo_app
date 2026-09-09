import { useState } from "react";
import { useTask } from "../context/TaskContext";
import { handleUpdateTask } from "../services/tasks.service";
import { useToast } from "../../../core/Toaster/Context/ToastContext";

interface TaskMetaDataProps {
    formatDate: (val: Date) => string;
}

function TaskMetaData({ formatDate }: TaskMetaDataProps) {
    const [addLabelForm, setAddLabelForm] = useState<boolean>(true);
    const [customTaskLabel, setCustomTaskLabel] = useState<string>("");
    const { selectedTask, selectedTaskId } = useTask();
    const defaultLabels = [
        "Work",
        "Personal",
        "Study",
        "Research",
        "Ideas",
        "Planning",
        "Learning",
    ];

    async function handleAddLabel(val?: string) {
        try {
            let label: string[] = [];
            if (selectedTask && selectedTask?.taskLabels.length > 0) {
                label = selectedTask?.taskLabels;
            }
            label.push(customTaskLabel);
            const data = {
                taskLabels: label,
            };
            const res = await handleUpdateTask(selectedTaskId, data);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    return (
        <div className="h-full w-sm p-2 flex flex-col">
            {addLabelForm ? (
                <div className="fixed h-screen w-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 z-60 bg-black/20">
                    <div className="bg-white w-70 p-2 rounded-xl border border-border-primary shadow-md flex flex-col items-start gap-2">
                        <h1 className="text-xs text-text-grey font-medium">
                            Add Label:
                        </h1>
                        <input
                            placeholder="Label name"
                            className="text-xs text-text-grey w-full outline-0 border border-border-primary p-2 rounded-lg focus:border-border-hover"
                        />
                        <div className="w-full flex items-center justify-end gap-2">
                            <button
                                onClick={() => setAddLabelForm(false)}
                                className="text-xs text-text-grey font-medium hover:cursor-pointer select-none hover:text-text-dark"
                            >
                                cancel
                            </button>
                            <button className="text-xs bg-button-primary hover:bg-button-hover text-text-light font-mdeium px-3 py-1.5 rounded-lg hover:cursor-pointer shadow-md active:scale-[0.96]">
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}

            <div className="flex flex-col gap-2 p-2 border-b border-border-primary">
                <h1 className="text-xs font-semibold text-text-dark">
                    Projects
                </h1>
                <span className="w-full text-xs font-medium text-text-grey hover:bg-hover rounded-md py-2 px-2">
                    Inbox
                </span>
            </div>

            {/* date */}
            <div className="flex flex-col gap-1 p-2 py-4 border-b border-border-primary">
                <h1 className="text-xs font-semibold text-text-dark">
                    Created At
                </h1>
                <span className="text-xs font-medium text-text-grey">
                    {formatDate(
                        selectedTask?.createdAt
                            ? selectedTask?.createdAt
                            : new Date(),
                    )}
                </span>
            </div>

            {/* priority */}

            <div className="w-full p-2 py-4 flex flex-col gap-2 border-b border-border-primary">
                <h1 className="text-xs font-semibold tex-text-dark">
                    Priority
                </h1>
                <span className="w-fit text-xs px-4 py-1 border border-border-hover shadow-sm rounded-md select-none hover:cursor-pointer">
                    Low
                </span>
            </div>

            {/* labels */}
            <div className="w-full flex flex-col p-2 gap-2">
                <h1 className="text-xs font-semibold text-text-dark">
                    Labels:
                </h1>
                <div className="flex flex-col">
                    <div className="flex flex-col gap-2">
                        {selectedTask ? (
                            selectedTask?.taskLabels?.length > 0 ? (
                                selectedTask?.taskLabels.map((label, key) => (
                                    <span key={key}>{label}</span>
                                ))
                            ) : (
                                <p className="text-xs text-text-grey font-medium">
                                    No Label Added
                                </p>
                            )
                        ) : null}
                        <h1 className="mt-2 text-xs font-semibold text-text-dark">
                            Add Labels:
                        </h1>
                        <div className="w-full flex items-center flex-wrap gap-2">
                            {defaultLabels.map((label, key) => (
                                <span
                                    key={key}
                                    className="border border-border-primary rounded-lg px-3 py-1.5 text-xs text-text-grey font-medium hover:cursor-pointer hover:bg-hover bg-white hover:shadow-sm hover:text-text-dark select-none"
                                >
                                    {label}
                                </span>
                            ))}
                            <button
                                onClick={() => setAddLabelForm(true)}
                                className="text-xs text-text-grey font-medium hover:text-text-dark hover:cursor-pointer select-none active:scale-[0.96]"
                            >
                                Add Label +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskMetaData;
