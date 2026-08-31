import { AuthProvider } from "./Context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Forms/Login";
import Register from "./Forms/Register";
import HomePage from "./Pages/HomePage";
import LandingPage from "./Pages/LandingPage";
import Navbar from "./components/Navbar";
import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="homepage" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
