import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { User } from "../types.ts";
import Arrow from "./Arrow.tsx";
import LoadingSpinner from "./LoadingSpinner.tsx";
import PaginationControls from "./PaginationControls.tsx";

export default function Users() {
    // Initialising search params and their default values
    const [searchParams, setSearchParams] = useSearchParams({
        page: "1",
        userid: "1",
    });

    // extracting values/state from url search params
    const pageNum = searchParams.get("page") ?? "1";
    const userId = searchParams.get("userid") ?? "1";

    const [users, setUsers] = useState<User[]>([]);

    // used to show a loading spinner while asynchronous tasks are taking place
    const [isLoading, setIsLoading] = useState(false);

    // sidebar of users can be minimised on smaller devices, this value is used for a toggle contolling this behavour
    const [sidebarIsOpen, setSidebarIsOpen] = useState(true);

    //  fecthing a pages of users, using the page number from url
    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(
                `https://reqres.in/api/users?page=${pageNum}`
            );
            const data = await res.json();
            const users = data.data;
            setUsers(users);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    // updates the userid search param when user is clicked in sidebar so that the correct details can be fetched
    const handleUserClicked = (id: number) => {
        setSearchParams((prev) => {
            prev.set("userid", `${id}`);
            return prev;
        });
    };

    const handleSidebarToggle = () => {
        setSidebarIsOpen((prev) => !prev);
    };

    useEffect(() => {
        fetchUsers();
    }, [pageNum]);

    return (
        <div>
            <ul className={`${!sidebarIsOpen && "sidebar-closed"}`}>
                <button
                    className="toggle-sidebar"
                    onClick={handleSidebarToggle}
                >
                    <Arrow />
                </button>
                {isLoading ? (
                    <LoadingSpinner />
                ) : users.length ? (
                    users.map((user) => (
                        <li key={user.id} data-testid="user">
                            <button
                                className={`user ${
                                    user.id === parseInt(userId)
                                        ? "selected"
                                        : ""
                                }`}
                                onClick={() => handleUserClicked(user.id)}
                            >
                                {user.first_name} {user.last_name}
                            </button>
                        </li>
                    ))
                ) : (
                    <div className="no-users">No more users</div>
                )}
            </ul>
            {sidebarIsOpen && (
                <PaginationControls
                    hasPrev={parseInt(pageNum) > 1}
                    hasNext={users.length > 0}
                    pageNum={pageNum}
                    setSearchParams={setSearchParams}
                />
            )}
        </div>
    );
}
