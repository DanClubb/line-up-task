import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { User } from "../types.ts";
import PaginationControls from "./PaginationControls.tsx";

export default function Users() {
    const [searchParams, setSearchParams] = useSearchParams({ page: "1" });
    const pageNum = searchParams.get("page") ?? "1";

    const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = async () => {
        const res = await fetch(`https://reqres.in/api/users?page=${pageNum}`);
        const data = await res.json();
        const users = data.data;
        setUsers(users);
    };

    useEffect(() => {
        fetchUsers();
    }, [pageNum]);
    return (
        <div>
            <ul>
                {users.map((user) => (
                    <li>
                        <Link key={user.id} to={`/user?id=${user.id}`}>
                            <img
                                src={user.avatar}
                                alt={`${user.first_name}'s profile picture`}
                            />
                            <h1>
                                {user.first_name} {user.last_name}
                            </h1>
                        </Link>
                    </li>
                ))}
            </ul>
            <PaginationControls
                pageNum={pageNum}
                setSearchParams={setSearchParams}
            />
        </div>
    );
}
