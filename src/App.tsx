import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
    return (
        <Routes>
            <Route path="/users" element={<div>List of users</div>} />
            <Route path="/user" element={<div>User details</div>} />
        </Routes>
    );
}

export default App;
