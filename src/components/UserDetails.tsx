import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { User } from "../types";
import LoadingSpinner from "./LoadingSpinner";

export default function UserDetails() {
    // retriving userid value from search params
    const [searchParams] = useSearchParams({
        page: "1",
        userid: "1",
    });
    const userId = searchParams.get("userid");

    const [userDetails, setUserDetails] = useState<User>();
    const [isLoading, setIsLoading] = useState(false);

    //  fecthing the selected user's details, using the userid from url
    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`https://reqres.in/api/users/${userId}`);
            const data = await res.json();
            const userDetails = data.data;
            setUserDetails(userDetails);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [userId]);
    return (
        <div className="user-details">
            {isLoading ? (
                <LoadingSpinner />
            ) : userDetails ? (
                <>
                    <img
                        src={userDetails.avatar}
                        alt={`${userDetails.first_name}'s profile picture`}
                    />
                    <div className="user-details-text">
                        <p>
                            First name:{" "}
                            <strong data-testid="firstname">
                                {userDetails.first_name}
                            </strong>
                        </p>
                        <p>
                            Last name:{" "}
                            <strong data-testid="lastname">
                                {userDetails.last_name}
                            </strong>
                        </p>

                        <p>
                            Email:{" "}
                            <span className="user-details-email">
                                {userDetails.email}
                            </span>
                        </p>
                    </div>
                </>
            ) : (
                <div style={{ color: "red" }}>
                    Can't get user details at this time
                </div>
            )}
        </div>
    );
}
