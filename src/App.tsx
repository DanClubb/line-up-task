import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserDetails from "./components/UserDetails";
import Users from "./components/Users";

function App() {
    return (
        <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/user" element={<UserDetails />} />
        </Routes>
    );
}

export default App;
