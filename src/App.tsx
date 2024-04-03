import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import UserDetails from "./components/UserDetails";

function App() {
    return (
        <Routes>
            <Route path="/users" element={<Dashboard />} />
            <Route path="/user" element={<UserDetails />} />
        </Routes>
    );
}

export default App;
