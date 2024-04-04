import "./App.css";
import Dashboard from "./components/Dashboard";

function App() {
    return (
        <>
            <h1>Choose A User</h1>{" "}
            {/* as dataset gets bigger a search bar could maybe replace this title */}
            <Dashboard />
        </>
    );
}

export default App;
