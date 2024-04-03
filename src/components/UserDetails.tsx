import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { User } from "../types";

export default function UserDetails() {
    const [searchParams] = useSearchParams({
        page: "1",
        userid: "1",
    });
    const userId = searchParams.get("userid");

    const [userDetails, setUserDetails] = useState<User>();

    const fetchUsers = async () => {
        const res = await fetch(`https://reqres.in/api/users/${userId}`);
        const data = await res.json();
        const userDetails = data.data;
        setUserDetails(userDetails);
    };

    useEffect(() => {
        fetchUsers();
    }, [userId]);
    return (
        <div>
            <img
                src={userDetails?.avatar}
                alt={`${userDetails?.first_name}'s profile picture`}
            />
            <h1>
                {userDetails?.first_name} {userDetails?.last_name}
            </h1>
            <p>Email: {userDetails?.email}</p>
        </div>
    );
}
