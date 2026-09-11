import crossIcon from "../../../assets/icons/close_icon.png";
import { useState } from "react";
import { useTask } from "../context/TaskContext";
import { useToast } from "../../../core/toaster/Context/ToastContext";

interface TaskMetaDataProps {
    formatDate: (val: Date) => string;
}

function TaskMetaData({ formatDate }: TaskMetaDataProps) {
    const [addLabelForm, setAddLabelForm] = useState<boolean>(false);
    const [customTaskLabel, setCustomTaskLabel] = useState<string>("");
    const { selectedTask, selectedTaskId, updateTask } = useTask();
    const { handleShowToast } = useToast();
    const defaultLabels = [
        "Work",
        "Personal",
        "Study",
        "Research",
        "Ideas",
        "Planning",
        "Learning",
    ];

    function handleTaskPriority(val: number) {
        if (!val) return;
        try {
            const data = {
                taskPriority: val,
            };
            updateTask(selectedTaskId, data);
            handleShowToast({
                message: "Task Priority Updated!",
                status: true,
            });
        } catch (error: any) {
            handleShowToast({
                message: "Failed to update task Priority!",
                status: false,
            });
            throw new Error(error);
        }
    }

    function handleAddLabel(val?: string) {
        if (!val && (!customTaskLabel || customTaskLabel.trim() === "")) {
            handleShowToast({
                message: "Lable cannot be empty!",
                status: false,
            });
            return;
        }
        try {
            let label: string[] = [];
            if (selectedTask && selectedTask?.taskLabels.length > 0) {
                label = selectedTask?.taskLabels;
            }

            if (
                (val && label.includes(val)) ||
                label.includes(customTaskLabel)
            ) {
                handleShowToast({
                    message: "Label already added!",
                    status: false,
                });
                return;
            }

            if (val) {
                label.push(val);
            } else {
                label.push(customTaskLabel);
            }
            const data = {
                taskLabels: label,
            };
            updateTask(selectedTaskId, data);
            setAddLabelForm(false);
            setCustomTaskLabel("");
            handleShowToast({
                message: "Label added successfully!",
                status: true,
            });
        } catch (error: any) {
            handleShowToast({
                message: "Failed to add Label!",
                status: false,
            });
            throw new Error(error);
        }
    }

    async function handleRemoveLabel(val: string) {
        try {
            if (!val || val.trim() === "") {
                handleShowToast({
                    message: "Invalid Label Selected!",
                    status: false,
                });
                return;
            }
            let label: string[] = [];
            if (selectedTask) {
                label = selectedTask?.taskLabels.filter(
                    (label) => label !== val,
                );
            }
            const data = {
                taskLabels: label,
            };
            updateTask(selectedTaskId, data);
            handleShowToast({
                message: "Label Removed",
                status: true,
            });
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
                            value={customTaskLabel}
                            onChange={(e) => setCustomTaskLabel(e.target.value)}
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
                            <button
                                onClick={() => handleAddLabel()}
                                className="text-xs bg-button-primary hover:bg-button-hover text-text-light font-mdeium px-3 py-1.5 rounded-lg hover:cursor-pointer shadow-md active:scale-[0.96]"
                            >
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
            <div className="relative w-full p-2 py-4 flex flex-col gap-2 border-b border-border-primary">
                <div className="flex items-center gap-2">
                    <h1 className="text-xs font-semibold tex-text-dark">
                        Priority
                    </h1>
                </div>
                <div>
                    <select
                        defaultValue={selectedTask?.taskPriority}
                        onChange={(e) =>
                            handleTaskPriority(Number(e.target.value))
                        }
                        className="text-xs border border-border-primary rounded-lg p-2 px-3"
                    >
                        <option value={3} className="text-sm">
                            Low
                        </option>
                        <option value={2} className="text-sm">
                            Medium
                        </option>
                        <option value={1} className="text-sm">
                            High
                        </option>
                    </select>
                </div>
            </div>

            {/* labels */}
            <div className="w-full flex flex-col p-2 gap-2">
                <h1 className="text-xs font-semibold text-text-dark">
                    Labels:
                </h1>
                <div className="flex flex-col">
                    <div className="flex flex-col gap-2">
                        {selectedTask ? (
                            <div className="w-full flex items-center gap-2 flex-wrap">
                                {selectedTask?.taskLabels?.length > 0 ? (
                                    selectedTask?.taskLabels.map(
                                        (label, key) => (
                                            <div
                                                key={key}
                                                className="relative w-fit text-xs text-text-grey font-medium px-3 py-1.5 border border-border-primary rounded-lg select-none hover:curosr-pointer hover:shadow-sm"
                                            >
                                                {label}
                                                <button
                                                    onClick={() =>
                                                        handleRemoveLabel(label)
                                                    }
                                                    className="absolute -top-1 -right-1 border border-border-hover rounded-full bg-white p-0.5 hover:cursor-pointer"
                                                >
                                                    <img
                                                        src={crossIcon}
                                                        alt="cross_icon.png"
                                                        className="h-1.5"
                                                    />
                                                </button>
                                            </div>
                                        ),
                                    )
                                ) : (
                                    <p className="text-xs text-text-grey font-medium">
                                        No Label Added
                                    </p>
                                )}
                            </div>
                        ) : null}
                        <h1 className="mt-2 text-xs font-semibold text-text-dark">
                            Add Labels:
                        </h1>
                        <div className="w-full flex items-center flex-wrap gap-2">
                            {defaultLabels.map((label, key) => (
                                <button
                                    onClick={() => handleAddLabel(label)}
                                    key={key}
                                    className="border border-border-primary rounded-lg px-3 py-1.5 text-xs text-text-grey font-medium hover:cursor-pointer hover:bg-hover bg-white hover:shadow-sm hover:text-text-dark select-none"
                                >
                                    {label}
                                </button>
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
