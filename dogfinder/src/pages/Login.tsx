import { Input } from "../components/Input";
import { Button } from "../components/Button";
import authService from "../services/APIGateway";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { APIGateway } from "../services/APIGateway";
import { IAuthGateway } from "../services/auth/IAuthGateway";

interface ILoginProps {
    authGateway: IAuthGateway
}
export const Login = ({ authGateway }: ILoginProps) => {
    const name = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const nameError = document.getElementById("name-error") as HTMLParagraphElement;
    const emailError = document.getElementById("email-error") as HTMLParagraphElement;
    const navigate = useNavigate();

    const handleLogin = (e: any) => {
        e.preventDefault()
        authGateway.Login(name.current?.value!, email.current?.value!)
            .then(response => {
                console.log(response);
                if (response.message === "Please enter your name") {
                    nameError!.style.display = "block";
                    emailError!.style.display = "none";
                } else if (response.message === "Please enter a valid email") {
                    nameError!.style.display = "none";
                    emailError!.style.display = "block";
                } else if (response.status === 200) {
                    nameError!.style.display = "none";
                    emailError!.style.display = "none";
                    navigate("/search");
                }
            })
            .catch(err => console.log(err));
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