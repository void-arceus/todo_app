import { useState } from "react";
import TaskList from "../../tasks/components/TaskList";
import InboxView from "../../tasks/components/InboxView";
import TodayView from "../../tasks/components/TodayView";
import UpcomingView from "../../tasks/components/UpcomingView";
import FilterView from "../../tasks/components/FilterView";
import ReportingsView from "../../tasks/components/ReportingsView";

interface IMyTodoProps {
    activeSideMenu: string;
}

function MyTodo({ activeSideMenu }: IMyTodoProps) {
    function renderMainContent() {
        switch (activeSideMenu) {
            case "inbox":
                return <InboxView />;
            case "today":
                return <TodayView />;
            case "upcoming":
                return <UpcomingView />;
            case "filters":
                return <FilterView />;
            case "reportings":
                return <ReportingsView />;
            default:
                return <>Select an Option from the Menu</>;
        }
    }

    return (
        <main className="w-full h-full flex flex-col items-center">
            <div className="w-full flex items-center justify-end py-2 px-4">
                <span className="py-2 px-3 border border-border-primary hover:border-border-hover rounded-lg text-xs font-medium cursor-pointer select-none hover:shadow-md active:scale-[0.96]">
                    Display: 1
                </span>
            </div>
            <div className="w-full px-10">{renderMainContent()}</div>
        </main>
    );
}

export default MyTodo;
