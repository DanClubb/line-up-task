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
                    <li className="user">
                        <Link key={user.id} to={`/user?id=${user.id}`}>
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
