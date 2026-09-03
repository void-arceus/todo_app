import addTaskIcon from "../../../assets/sidebar/add_task_logo.png";
import searchIcon from "../../../assets/sidebar/search.png";
import inboxIcon from "../../../assets/sidebar/inbox.png";
import inboxIconActive from "../../../assets/sidebar/inbox_active.png";
import todayIcon from "../../../assets/sidebar/today.png";
import todayIconActive from "../../../assets/sidebar/today_active.png";
import upcomingIcon from "../../../assets/sidebar/upcoming.png";
import upcomingIconActive from "../../../assets/sidebar/upcoming_active.png";
import filterIcon from "../../../assets/sidebar/filter.png";
import filterIconActive from "../../../assets/sidebar/filter_active.png";
import reportingIcon from "../../../assets/sidebar/report.png";
import reportingIconActive from "../../../assets/sidebar/report_active.png";
import sidebarIcon from "../../../assets/sidebar/sidebar.png";
import logoutIcon from "../../../assets/icons/logout_icon.png";
import { useAuth } from "../../../core/auth/context/AuthContext";
import { useState } from "react";
import { handleLogout } from "../../tasks/services/tasks.services";
import { useNavigate } from "react-router-dom";

interface ISidebarProps {
    activeSideMenu: string;
    handleActiveSideMenu: (val: string) => void;
    handleDisplayTaskForm: () => void;
    handleShowSideBar: () => void;
    isOpen: boolean;
}

function Sidebar({
    activeSideMenu,
    handleActiveSideMenu,
    handleDisplayTaskForm,
    handleShowSideBar,
    isOpen,
}: ISidebarProps) {
    const [userMenu, setUserMenu] = useState<boolean>(false);
    const { userData, handleLoggedIn, handleSetUserData } = useAuth();
    const navigate = useNavigate();

    async function logout() {
        try {
            await handleLogout();
            handleSetUserData(null);
            handleLoggedIn(false);
            navigate("/");
        } catch (error: any) {
            throw new Error(error);
        }
    }

    return (
        <main
            onClick={() => setUserMenu(false)}
            className={`fixed top-0 left-0 z-40 h-screen w-full max-w-xs border-r border-border-primary bg-bg-primary shadow-sm flex flex-col transform transition-transform duration-300 ease-in-out ${
                isOpen
                    ? "translate-x-0 opacity-100"
                    : "opacity-50 -translate-x-full"
            }`}
        >
            <div className="p-2 flex items-center justify-between">
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        setUserMenu((prev) => !prev);
                    }}
                    className="relative flex items-center gap-2 px-2 py-1 hover:bg-hover rounded-md active:scale-[0.96]"
                >
                    <span className="bg-black/10 flex items-center justify-center border border-border-hover h-6 w-6 rounded-full text-bold select-none">
                        {userData?.username[0]}
                    </span>
                    <h1 className="text-xs font-medium text-text-dark cursor-pointer select-none">
                        {userData?.username}
                    </h1>
                </div>
                {userMenu ? (
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-12 left-4 p-1.5 w-60 bg-white rounded-lg shadow-[0_0_10px_2px_rgba(0,0,0,0.1)]"
                    >
                        <div
                            onClick={() => {}}
                            className="text-start p-2 text-xs font-medium w-full hover:bg-hover rounded-md flex items-center justify-start gap-2"
                        >
                            <img alt="." className="h-4" />
                            <span>Update Profile</span>
                        </div>
                        <button
                            onClick={() => {
                                logout();
                            }}
                            className="text-start p-2 text-xs w-full hover:bg-hover rounded-md flex items-center justify-start gap-2"
                        >
                            <img
                                src={logoutIcon}
                                alt="logout_icon.png"
                                className="h-4"
                            />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                ) : null}
                <div className="text-xs font-medium">
                    <button
                        onClick={() => handleShowSideBar()}
                        className="hover:cursor-pointer"
                    >
                        <img
                            src={sidebarIcon}
                            alt="sidebar.png"
                            className="h-5"
                        />
                    </button>
                </div>
            </div>
            <div className="w-full p-1.5">
                <button
                    onClick={() => handleDisplayTaskForm()}
                    className="w-full text-start text-xs font-semibold p-2 active:scale-[0.97] hover:bg-hover transition-scale duration-100 ease-in rounded-md flex items-center gap-1"
                >
                    <img
                        src={addTaskIcon}
                        alt="add_task_logo.png"
                        className="h-4"
                    />
                    <span>Add Task</span>
                </button>
            </div>
            <div className="w-full flex flex-col items-start text-text-dark px-2">
                <div
                    className={`p-2 hover:bg-hover w-full rounded-md text-xs font-medium hover:cursor-pointer flex items-center gap-2`}
                >
                    <img src={searchIcon} alt="search.png" className="h-4" />
                    <span>Search</span>
                </div>
                <div
                    onClick={() => handleActiveSideMenu("inbox")}
                    className={`${activeSideMenu === "inbox" ? "bg-active" : "hover:bg-hover"} p-2  w-full rounded-md text-xs font-medium hover:cursor-pointer flex items-center gap-2`}
                >
                    <img
                        src={
                            activeSideMenu === "inbox"
                                ? inboxIconActive
                                : inboxIcon
                        }
                        alt="inbox.png"
                        className="h-4"
                    />
                    <span>Inbox</span>
                </div>
                <div
                    onClick={() => handleActiveSideMenu("today")}
                    className={`${activeSideMenu === "today" ? "bg-active" : "hover:bg-hover"} p-2 w-full rounded-md text-xs font-medium hover:cursor-pointer flex items-center gap-2`}
                >
                    <img
                        src={
                            activeSideMenu === "today"
                                ? todayIconActive
                                : todayIcon
                        }
                        alt="today.png"
                        className="h-4"
                    />
                    <span>Today</span>
                </div>
                <div
                    onClick={() => handleActiveSideMenu("upcoming")}
                    className={`${activeSideMenu === "upcoming" ? "bg-active" : "hover:bg-hover"} p-2 w-full rounded-md text-xs font-medium hover:cursor-pointer flex items-center gap-2`}
                >
                    <img
                        src={
                            activeSideMenu === "upcoming"
                                ? upcomingIconActive
                                : upcomingIcon
                        }
                        alt="upcoming.png"
                        className="h-4"
                    />
                    <span>Upcoming</span>
                </div>
                <div
                    onClick={() => handleActiveSideMenu("filters")}
                    className={`${activeSideMenu === "filters" ? "bg-active" : "hover:bg-hover"} p-2 w-full rounded-md text-xs font-medium hover:cursor-pointer flex items-center gap-2`}
                >
                    <img
                        src={
                            activeSideMenu === "filters"
                                ? filterIconActive
                                : filterIcon
                        }
                        alt="filter.png"
                        className="h-4"
                    />
                    <span>Filters & Labels</span>
                </div>
                <div
                    onClick={() => handleActiveSideMenu("reportings")}
                    className={`${activeSideMenu === "reportings" ? "bg-active" : "hover:bg-hover"} p-2 w-full rounded-md text-xs font-medium hover:cursor-pointer flex items-center gap-2`}
                >
                    <img
                        src={
                            activeSideMenu === "reportings"
                                ? reportingIconActive
                                : reportingIcon
                        }
                        alt="report.png"
                        className="h-4"
                    />
                    <span>Reportings</span>
                </div>
            </div>
        </main>
    );
}

export default Sidebar;
