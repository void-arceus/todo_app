import { useState } from "react";
import Sidebar from "../features/dashboard/components/Sidebar";
import MyTodo from "../features/dashboard/components/MyTodo";
import TaskForm from "../features/tasks/components/TaskForm";
import sideBarIcon from "../assets/sidebar/sidebar.png";

function DashboardPage() {
    const [activeSideMenu, setActiveSideMenu] = useState<string>("inbox");
    const [displayTaskForm, setDisplayTaskForm] = useState<boolean>(false);
    const [showSideBar, setShowSideBar] = useState<boolean>(true);

    function handleActiveSideMenu(val: string) {
        setActiveSideMenu(val);
    }

    function handleDisplayTaskForm() {
        setDisplayTaskForm((prev) => !prev);
    }

    function handleShowSideBar() {
        setShowSideBar((prev) => !prev);
    }

    return (
        <main className="relative h-screen w-full flex items-start">
            {displayTaskForm ? (
                <TaskForm handleDisplayTaskForm={handleDisplayTaskForm} />
            ) : null}
            <Sidebar
                activeSideMenu={activeSideMenu}
                handleActiveSideMenu={handleActiveSideMenu}
                handleDisplayTaskForm={handleDisplayTaskForm}
                handleShowSideBar={handleShowSideBar}
                isOpen={showSideBar}
            />
            <div
                className={`${showSideBar ? "hidden" : "fixed left-0 top-0 p-3"}`}
            >
                <button onClick={handleShowSideBar} className="cursor-pointer">
                    <img src={sideBarIcon} alt="sidebar.png" className="h-5" />
                </button>
            </div>
            <MyTodo activeSideMenu={activeSideMenu} isOpen={showSideBar} />
        </main>
    );
}

export default DashboardPage;
