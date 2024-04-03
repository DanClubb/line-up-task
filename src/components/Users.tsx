import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { User } from "../types.ts";
import Arrow from "./Arrow.tsx";
import LoadingSpinner from "./LoadingSpinner.tsx";
import PaginationControls from "./PaginationControls.tsx";

export default function Users() {
    const [searchParams, setSearchParams] = useSearchParams({
        page: "1",
        userid: "1",
    });
    const pageNum = searchParams.get("page") ?? "1";
    const userId = searchParams.get("userid") ?? "1";

    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sidebarIsOpen, setSidebarIsOpen] = useState(true);

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
                        <li
                            key={user.id}
                            className={`user ${
                                user.id === parseInt(userId)
                                    ? "selected"
                                    : "nah"
                            }`}
                            onClick={() => handleUserClicked(user.id)}
                        >
                            <h2>
                                {user.first_name} {user.last_name}
                            </h2>
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
