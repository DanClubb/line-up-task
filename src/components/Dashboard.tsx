import UserDetails from "./UserDetails";
import Users from "./Users";

export default function Dashboard() {
    return (
        <main>
            <section>
                <Users />
            </section>
            <section className="user-details-container">
                <UserDetails />
            </section>
        </main>
    );
}
