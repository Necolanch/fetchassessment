import { render, screen } from "@testing-library/react";
import { Button } from "./Button";
import userEvent from "@testing-library/user-event";

describe("Button", () => {
    const setup = () => render(<Button styles="" text="Text" onClick={jest.fn()} />)

    it("Has text", () => {
        setup();
        const text = screen.getByText("Text");
        expect(text).toBeInTheDocument();
    });

    it("Calls a function when clicked", () => {
        setup();
        userEvent.click(screen.getByText("Text"));
    })
});