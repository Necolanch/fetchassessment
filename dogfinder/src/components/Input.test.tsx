import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";
import React, { useRef } from "react";

describe("Input", () => {
    const text = useRef<HTMLInputElement>(null);
    const setup = () => render(<Input reference={text} type="text" role="input" styles="bg-red-500" />);

    it("Should be able to be used", () => {
        setup();
        userEvent.type(screen.getByRole("input"), "text")
    })
})