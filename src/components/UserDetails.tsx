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
        <div className="user-details">
            <img
                src={userDetails?.avatar}
                alt={`${userDetails?.first_name}'s profile picture`}
            />
            <div className="user-details-text">
                <p>
                    First name: <strong>{userDetails?.first_name}</strong>
                </p>
                <p>
                    Last name: <strong>{userDetails?.last_name}</strong>
                </p>

                <p>
                    Email:{" "}
                    <span className="user-details-email">
                        {userDetails?.email}
                    </span>
                </p>
            </div>
        </div>
    );
}
