import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Login } from "./Login";

describe("Login", () => {
    const setup = () => render(<Login />);

    it("Renders on screen", () => {
        setup();
        expect(screen.getByRole("login")).not.toBeNull()
    });

    it("Does not enter a name", () => {
        setup();
        userEvent.type(screen.getByRole("name"), "");
        userEvent.type(screen.getByRole("email"), "test@test.com");
        fireEvent.submit(screen.getByRole("email"));
    });

    it("Puts in wrong email format", () => {
        setup();
        userEvent.type(screen.getByRole("name"), "name");
        userEvent.type(screen.getByRole("email"), "test@test");
        fireEvent.submit(screen.getByRole("email"));
    });

    it("Puts in correct email format", () => {
        setup();
        userEvent.type(screen.getByRole("name"), "name");
        userEvent.type(screen.getByRole("email"), "test@test.com");
        fireEvent.submit(screen.getByRole("email"));
    });
})