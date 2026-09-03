import { useState } from "react";
import { useTask } from "../context/TaskContext";
import inboxIcon from "../../../assets/sidebar/inbox_active.png";
import emptyCircleIcon from "../../../assets/icons/empty_circle.png";
import emptyCicleActive from "../../../assets/icons/empty_circle_hover.png";

function TaskEditForm() {
    const { handleShowTaskEditForm } = useTask();
    const [activeCircleIcon, setActiveCircleIcon] =
        useState<string>(emptyCircleIcon);

    return (
        <div className="absolute z-40 w-full h-screen bg-black/30 flex items-center justify-center">
            <div className="w-full h-10/12 max-w-3xl border border-border-primary bg-white shadow-lg rounded-2xl">
                {/* top bar */}
                <div className="w-full flex items-center justify-between border-b border-border-primary px-4 py-2">
                    <div className="flex items-center gap-2">
                        <img
                            src={inboxIcon}
                            alt="inbox_acive.png"
                            className="h-4"
                        />
                        <span className="text-sm font-semibold text-text-dark select-none cursor-pointer">
                            Inbox
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <button className="text-xs text-text-dark font-medium cursor-pointer px-2 py-1 hover:bg-hover rounded-sm active:scale-[0.96]">
                            Menu
                        </button>
                        <button
                            onClick={() => handleShowTaskEditForm(false)}
                            className="text-xs text-text-dark font-medium cursor-pointer px-2 py-1 hover:bg-hover rounded-sm active:scale-[0.96]"
                        >
                            Close
                        </button>
                    </div>
                </div>
                <div className="w-full h-full flex p-2">
                    {/* left */}
                    <div className="h-full w-full border-r border-border-primary">
                        <div className="w-full flex items-start gap-2 border-b border-border-primary py-2">
                            <button
                                onMouseEnter={() =>
                                    setActiveCircleIcon(emptyCicleActive)
                                }
                                onMouseLeave={() =>
                                    setActiveCircleIcon(emptyCircleIcon)
                                }
                                className="hover:cursor-pointer pt-1"
                            >
                                <img
                                    src={activeCircleIcon}
                                    alt="empty_circle.png"
                                    className="h-4"
                                />
                            </button>
                            <div className="w-full flex flex-col items-start justify-center gap-1">
                                <h1 className="text-sm font-medium text-text-grey">
                                    Task title will appear here
                                </h1>
                                <p className="text-xs font-regular text-text-grey">
                                    Task Description will appear here...
                                </p>
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            {/* comments for later */}
                            <button className="text-sm text-text-dark font-medium cursor-pointer select-none py-2 px-4">
                                Comments
                            </button>
                            <div className="w-full px-4 relative">
                                <input
                                    placeholder="Add a comment"
                                    className="text-xs text-text-grey outline-0 border border-border-primary w-full p-2 rounded-full focus:border-border-hover"
                                />
                                <button className="absolute right-7 top-2 text-xs font-semibold cursor-pointer select-none z-10">
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* right */}
                    <div className="h-full w-sm">
                        <p>Other options</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskEditForm;
