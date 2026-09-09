import { useState } from "react";
import { useTask } from "../context/TaskContext";
import inboxIcon from "../../../assets/sidebar/inbox_active.png";

import menuIcon from "../../../assets/icons/menu_dots.png";
import closeIcon from "../../../assets/icons/close_icon.png";

import deleteIcon from "../../../assets/icons/delete.png";

import TaskMetaData from "./TaskMetaData";
import TaskDetail from "./TaskDetail";

function TaskEditForm() {
    const { handleShowTaskEditForm, handleSelectedTaskId } = useTask();
    const [showMenu, setShowMenu] = useState<boolean>(false);

    function formatDate(myDate: Date) {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        };
        const customDate = new Date(myDate).toLocaleDateString(
            "en-US",
            options as any,
        );
        return customDate;
    }

    return (
        <div className="absolute z-40 w-full h-screen bg-black/30 flex items-center justify-center">
            <div
                onClick={() => setShowMenu(false)}
                className="w-full h-10/12 flex flex-col max-w-3xl border border-border-primary bg-white shadow-lg rounded-2xl"
            >
                {/* top bar */}
                <div className="relative w-full flex items-center justify-between border-b border-border-primary p-2">
                    {/* menu options */}
                    {showMenu ? (
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute w-40 z-50 bg-white right-6 top-8 border border-border-primary rounded-lg shadow-sm p-1"
                        >
                            <button className="w-full flex items-center justify-start gap-2 hover:bg-hover active:scale-[0.96] hover:cursor-pointer select-none p-2 rounded-md">
                                <img
                                    src={deleteIcon}
                                    alt="delete_icon.png"
                                    className="h-4"
                                />
                                <p className="text-xs font-medium text-text-dark">
                                    Delete Task
                                </p>
                            </button>
                        </div>
                    ) : null}
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
                    <div className="flex items-center gap-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowMenu((prev) => !prev);
                            }}
                            className="text-xs text-text-dark font-medium cursor-pointer p-1 rounded-sm active:scale-[0.96]"
                        >
                            <img
                                src={menuIcon}
                                alt="menu_dots.png"
                                className="h-3"
                            />
                        </button>
                        <button
                            onClick={() => {
                                handleSelectedTaskId("");
                                handleShowTaskEditForm(false);
                            }}
                            className="text-xs text-text-dark font-medium cursor-pointer p-1 rounded-sm active:scale-[0.96]"
                        >
                            <img
                                src={closeIcon}
                                alt="close_icon.png"
                                className="h-3"
                            />
                        </button>
                    </div>
                </div>
                <div className="w-full flex-1 flex">
                    {/* left */}
                    <TaskDetail formatDate={formatDate} />

                    {/* right */}
                    <TaskMetaData formatDate={formatDate} />
                </div>
            </div>
        </div>
    );
}

export default TaskEditForm;
