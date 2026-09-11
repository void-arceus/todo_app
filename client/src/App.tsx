import { AuthProvider } from "./core/auth/context/AuthContext";
import { TaskProvider } from "./features/tasks/context/TaskContext";
import { ToastProvider } from "./core/toaster/Context/ToastContext";
import ConfirmationProvider from "./core/confirmation/context/ConfirmationContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./core/auth/components/Login";
import Register from "./core/auth/components/Register";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import Toast from "./components/ui/Toast";
import axios from "axios";
import Confirmation from "./components/ui/Confirmation";
axios.defaults.withCredentials = true;

function App() {
    return (
        <AuthProvider>
            <ConfirmationProvider>
                <TaskProvider>
                    <ToastProvider>
                        <Confirmation />
                        <Toast />
                        <Router>
                            <Routes>
                                <Route path="/" element={<LandingPage />} />
                                <Route
                                    path="dashboard"
                                    element={<DashboardPage />}
                                />
                                <Route path="/login" element={<Login />} />
                                <Route
                                    path="/register"
                                    element={<Register />}
                                />
                            </Routes>
                        </Router>
                    </ToastProvider>
                </TaskProvider>
            </ConfirmationProvider>
        </AuthProvider>
    );
}

export default App;
