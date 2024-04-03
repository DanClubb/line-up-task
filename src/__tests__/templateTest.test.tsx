import { render, screen } from "@testing-library/react";
import App from "../App";

test("test initial load", async () => {
    render(<App />);

    const templateTitle = screen.getByText("Template App");

    expect(templateTitle).toBeInTheDocument();
});
