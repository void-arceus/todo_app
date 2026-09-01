import { useState } from "react";
import Sidebar from "../features/dashboard/components/Sidebar";
import MyTodo from "../features/dashboard/components/MyTodo";
import TaskForm from "../features/tasks/components/TaskForm";

function DashboardPage() {
    const [activeSideMenu, setActiveSideMenu] = useState<string>("inbox");
    const [displayTaskForm, setDisplayTaskForm] = useState<boolean>(false);

    function handleActiveSideMenu(val: string) {
        setActiveSideMenu(val);
    }

    function handleDisplayTaskForm() {
        setDisplayTaskForm((prev) => !prev);
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
            />
            <MyTodo activeSideMenu={activeSideMenu} />
        </main>
    );
}

export default DashboardPage;
