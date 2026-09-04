import { useState } from "react";
import { useTask } from "../context/TaskContext";
import inboxIcon from "../../../assets/sidebar/inbox_active.png";
import emptyCircleIcon from "../../../assets/icons/empty_circle.png";
import emptyCicleActive from "../../../assets/icons/empty_circle_hover.png";
import submitIcon from "../../../assets/icons/submit_icon.png";
import menuIcon from "../../../assets/icons/menu_dots.png";
import closeIcon from "../../../assets/icons/close_icon.png";

function TaskEditForm() {
    const { handleShowTaskEditForm } = useTask();
    const [activeCircleIcon, setActiveCircleIcon] =
        useState<string>(emptyCircleIcon);

    return (
        <div className="absolute z-40 w-full h-screen bg-black/30 flex items-center justify-center">
            <div className="w-full h-10/12 flex flex-col max-w-3xl border border-border-primary bg-white shadow-lg rounded-2xl">
                {/* top bar */}
                <div className="w-full flex items-center justify-between border-b border-border-primary px-2 py-2">
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
                        <button className="text-xs text-text-dark font-medium cursor-pointer p-1 rounded-sm active:scale-[0.96]">
                            <img
                                src={menuIcon}
                                alt="menu_dots.png"
                                className="h-3"
                            />
                        </button>
                        <button
                            onClick={() => handleShowTaskEditForm(false)}
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
                    <div className="h-full w-full border-r border-border-primary py-4 px-2">
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
                        <div className="p-2 w-full flex flex-col items-start">
                            <button className="text-sm text-text-dark font-medium cursor-pointer select-none py-2 px-4">
                                Comments
                            </button>
                            {/* comments for later */}
                            <div className="flex items-start gap-2 px-4 my-4">
                                <div className="px-3 py-1 border border-border-hover bg-black/10 rounded-full">
                                    <h1 className="text-md font-medium">v</h1>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-xs font-bold text-text-dark">
                                        void_arceus
                                    </p>
                                    <span className="text-xs font-medium text-text-grey">
                                        This is test comment
                                    </span>
                                </div>
                            </div>

                            {/* add comment section */}
                            <div className="w-full my-3">
                                <div className="w-full px-4 relative flex items-center gap-2">
                                    <div className="px-3 py-1 border border-border-hover rounded-full bg-black/10 cursor-pointer">
                                        <h1 className="text-md select-none cursor-pointer">
                                            v
                                        </h1>
                                    </div>
                                    <input
                                        placeholder="Add a comment"
                                        className="text-xs text-text-grey outline-0 border border-border-primary w-full p-2 rounded-full focus:border-border-hover"
                                    />
                                    <button className="absolute right-8 top-2 text-xs font-semibold cursor-pointer select-none z-10">
                                        <img
                                            src={submitIcon}
                                            alt="submit_icon.png"
                                            className="h-4"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* right */}
                    <div className="h-full w-sm p-2 flex flex-col">
                        <div className="flex flex-col gap-2 p-2 border-b border-border-primary">
                            <h1 className="text-xs font-semibold text-text-dark">
                                Projects
                            </h1>
                            <span className="w-full text-xs font-medium text-text-grey hover:bg-hover rounded-md py-2 px-2">
                                Inbox
                            </span>
                        </div>

                        {/* date */}
                        <div className="flex flex-col gap-2 p-2 border-b border-border-primary">
                            <h1 className="text-xs font-semibold text-text-dark">
                                Date
                            </h1>
                            <span className="text-xs font-medium text-text-grey">
                                01 sep
                            </span>
                        </div>

                        {/* priority */}
                        <div className="flex flex-col p-2 gap-2">
                            <h1 className="text-xs font-semibold text-text-dark">
                                Labels
                            </h1>
                            <div className="flex gap-2 flex-wrap">
                                <span className="text-xs font-medium text-text-grey p-1.5 px-3 border border-border-primary hover:border-border-hover hover:cursor-pointer rounded-lg hover:bg-hover hover:shadow-sm select-none active:scale-[0.98]">
                                    Label 1
                                </span>
                                <span className="text-xs font-medium text-text-grey p-1.5 px-3 border border-border-primary hover:border-border-hover hover:cursor-pointer rounded-lg hover:bg-hover hover:shadow-sm select-none active:scale-[0.98]">
                                    Label 2
                                </span>
                                <span className="text-xs font-medium text-text-grey p-1.5 px-3 border border-border-primary hover:border-border-hover hover:cursor-pointer rounded-lg hover:bg-hover hover:shadow-sm select-none active:scale-[0.98]">
                                    Label 3
                                </span>
                                <span className="text-xs font-medium text-text-grey p-1.5 px-3 border border-border-primary hover:border-border-hover hover:cursor-pointer rounded-lg hover:bg-hover hover:shadow-sm select-none active:scale-[0.98]">
                                    Label 4
                                </span>
                                <button className="text-xs px-3 py-1.5 cursor-pointer rounded-lg border border-border-primary hover:border-border-hover hover:bg-hover shadow-sm hover:shadow-md active:scale-[0.98]">
                                    Add New +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskEditForm;
