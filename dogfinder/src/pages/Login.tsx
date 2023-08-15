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
        if (authorized === "true") {
            navigate("/search")
        }
    }, [])

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
                    localStorage.setItem("authorized", "true")
                    navigate("/search");
                }
            })
            .catch(err => console.log(err));
    }
    return (
        <div className="w-screen h-screen flex flex-col items-center bg-gradient-to-tr from-[#40E0D0] to-teal-200">
            <form className="w-3/4 md:w-3/5 lg:w-2/5 h-1/2 flex flex-col items-center justify-center bg-slate-50 relative top-1/4 p-4 rounded-md shadow-md shadow-teal-500" id="login-form" role="login" onSubmit={handleLogin}>
                <div className="w-screen h-20 flex justify-center items-center">
                    <h1 className="font-light text-2xl text-cyan-950 text-center">NewHome</h1>
                    <img src={require("../img/pawprint.png")} alt="Pawprint" width={30} height={30} />
                </div>
                <label htmlFor="">Name</label>
                <Input type="text" role="name input" styles="rounded-sm border border-slate-800 outline-teal-700 p-1" reference={name} />
                <label className="mt-4" htmlFor="">Email</label>
                <Input type="email" role="email input" styles="rounded-sm border border-slate-800 outline-teal-700 p-1" reference={email} />
                <Button styles="mt-4 p-2 w-20 bg-teal-400 font-medium rounded-sm" text="Login" onClick={e => handleLogin(e)}></Button>
                <p id="name-error" hidden>Please enter your name</p>
                <p id="email-error" style={{ display: "none" }}>Please enter a valid email address</p>
            </form>
        </div>
    )
}