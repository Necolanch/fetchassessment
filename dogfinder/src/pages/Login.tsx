import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IAuthGateway } from "../services/auth/IAuthGateway";

interface ILoginProps {
    authGateway: IAuthGateway
}
export const Login = ({ authGateway }: ILoginProps) => {
    const name = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const authorized = localStorage.getItem("authorized");

    useEffect(() => {
        if (authorized) {
            navigate("/search")
        }
    })

    const handleLogin = (e: any) => {
        e.preventDefault()
        const nameError = document.getElementById("name-error") as HTMLParagraphElement;
        const emailError = document.getElementById("email-error") as HTMLParagraphElement;
        authGateway.Login(name.current?.value!, email.current?.value!)
            .then(response => {
                if (response.message === "Please enter your name") {
                    nameError!.style.display = "block";
                    emailError!.style.display = "none";
                } else if (response.message === "Please enter a valid email") {
                    nameError!.style.display = "none";
                    emailError!.style.display = "block";
                } else if (response.status === 200) {
                    nameError!.style.display = "none";
                    emailError!.style.display = "none";
                    localStorage.setItem("authorized", JSON.stringify(true))
                    navigate("/search");
                }
            })
            .catch(err => console.log(err));
    }

    setTimeout(() => localStorage.setItem("authorized", JSON.stringify(false)), 3600000)
    return (
        <div>
            <form id="login-form" role="login" onSubmit={handleLogin}>
                <Input type="text" role="name input" styles="rounded-sm" reference={name} />
                <Input type="email" role="email input" styles="text-red-500" reference={email} />
                <Button styles="bg-yellow-500" text="Login" onClick={e => handleLogin(e)}></Button>
            </form>
            <p id="name-error" hidden>Please enter your name</p>
            <p id="email-error" style={{ display: "none" }}>Please enter a valid email address</p>
        </div>
    )
}