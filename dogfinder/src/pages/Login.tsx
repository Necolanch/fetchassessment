import { Input } from "../components/Input";
import { Button } from "../components/Button";
import authService from "../services/authService";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const name = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const navigate = useNavigate();

    const handleLogin = (e: any) => {
        e.preventDefault()
        authService.login(name.current?.value!, email.current?.value!)
            .then(response => {
                if (response?.message === "Please enter your name") {
                    nameError!.style.display = "block";
                } else if (response?.message === "Please enter a valid email") {
                    nameError!.style.display = "none";
                    emailError!.style.display = "block";
                } else if (response === undefined) {
                    nameError!.style.display = "none";
                    emailError!.style.display = "none";
                    navigate("/search");
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <form role="login" onSubmit={handleLogin}>
                <Input type="text" role="name input" styles="rounded-sm" reference={name} />
                <Input type="email" role="email input" styles="text-red-500" reference={email} />
                <Button styles="bg-yellow-500" text="Login" onClick={e => handleLogin(e)}></Button>
            </form>
            <p id="name-error" hidden>Please enter your name</p>
            <p id="email-error" style={{ display: "none" }}>Please enter a valid email address</p>
        </div>
    )
}