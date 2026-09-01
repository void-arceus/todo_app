interface ISidebarProps {
    activeSideMenu: string;
    handleActiveSideMenu: (val: string) => void;
    handleDisplayTaskForm: () => void;
}

function Sidebar({
    activeSideMenu,
    handleActiveSideMenu,
    handleDisplayTaskForm,
}: ISidebarProps) {
    return (
        <main className="h-screen w-full max-w-xs border-r border-border-primary bg-bg-primary shadow-sm p-2 flex flex-col">
            <div>Profile</div>
            <div className="w-full">
                <button
                    onClick={() => handleDisplayTaskForm()}
                    className="w-full text-start text-xs font-semibold p-1.5 active:scale-[0.97] hover:bg-hover transition-scale duration-100 ease-in rounded-md"
                >
                    Add Task
                </button>
            </div>
            <ul className="w-full flex flex-col items-start text-text-dark">
                <li
                    className={`p-1.5 hover:bg-hover w-full rounded-md text-xs font-regular hover:cursor-pointer`}
                >
                    Search
                </li>
                <li
                    onClick={() => handleActiveSideMenu("inbox")}
                    className={`${activeSideMenu === "inbox" ? "bg-active" : "hover:bg-hover"} p-1.5  w-full rounded-md text-xs font-regular hover:cursor-pointer`}
                >
                    Inbox
                </li>
                <li
                    onClick={() => handleActiveSideMenu("today")}
                    className={`${activeSideMenu === "today" ? "bg-active" : "hover:bg-hover"} p-1.5 w-full rounded-md text-xs font-regular hover:cursor-pointer`}
                >
                    Today
                </li>
                <li
                    onClick={() => handleActiveSideMenu("upcoming")}
                    className={`${activeSideMenu === "upcoming" ? "bg-active" : "hover:bg-hover"} p-1.5 w-full rounded-md text-xs font-regular hover:cursor-pointer`}
                >
                    Upcoming
                </li>
                <li
                    onClick={() => handleActiveSideMenu("filters")}
                    className={`${activeSideMenu === "filters" ? "bg-active" : "hover:bg-hover"} p-1.5 w-full rounded-md text-xs font-regular hover:cursor-pointer`}
                >
                    Filters & Labels
                </li>
                <li
                    onClick={() => handleActiveSideMenu("reportings")}
                    className={`${activeSideMenu === "reportings" ? "bg-active" : "hover:bg-hover"} p-1.5 w-full rounded-md text-xs font-regular hover:cursor-pointer`}
                >
                    Reportings
                </li>
            </ul>
        </main>
    );
}

export default Sidebar;
