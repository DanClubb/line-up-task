import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { User } from "../types.ts";
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

    useEffect(() => {
        fetchUsers();
    }, [pageNum]);

    return (
        <div>
            <ul>
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
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
                            <h1>
                                {user.first_name} {user.last_name}
                            </h1>
                        </li>
                    ))
                )}
            </ul>
            <PaginationControls
                pageNum={pageNum}
                setSearchParams={setSearchParams}
            />
        </div>
    );
}
