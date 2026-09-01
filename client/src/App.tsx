import { AuthProvider } from "./core/auth/context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./core/auth/components/Login";
import Register from "./core/auth/components/Register";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
