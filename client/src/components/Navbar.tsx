import { useNavigate } from "react-router-dom";
import task_logo from "../assets/task_logo.png";

import { useAuth } from "../Context/AuthContext";

function Navbar() {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="fixed z-10 w-full flex items-center justify-center p-2 bg-bg-primary border-b border-b-border-primary shadow-xs">
            <div className="w-11/12 flex items-center justify-between">
                <div onClick={() => navigate("/")} className="cursor-pointer">
                    <img
                        src={task_logo}
                        alt="task_logo.png"
                        className="remove-white-bg w-40"
                    />
                </div>
                {isLoggedIn ? (
                    <div>Display User profile in that case</div>
                ) : (
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate("/login")}
                            className="text-sm font-medium text-text-red cursor-pointer hover:text-text-red-hover text-shadow-black"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate("/register")}
                            className="bg-button-primary text-text-light px-5 border-none text-sm font-medium rounded-xs py-2.5 hover:cursor-pointer hover:shadow-md active:scale-[0.98] transition-scale duration-100 hover:bg-button-hover"
                        >
                            Sign up
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
