// My testing setup is broken and therefore I'm not 100% sure these tests are correct and would pass

import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

test("test list of users is displayed", async () => {
    render(<App />);

    const users = await screen.findAllByTestId("user");

    expect(users).not.toHaveLength(0);
});

test("when a user is clicked the correct user details are displayed", async () => {
    render(<App />);

    const user = await screen.findByRole("heading", { name: "Eve Holt" });

    fireEvent.click(user);

    const firstName = await screen.findByTestId("firstname");
    const lastName = await screen.findByTestId("lastname");

    expect(firstName).toBe("Eve");
    expect(lastName).toBe("Holt");
});
