import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IAuthGateway } from "../services/auth/IAuthGateway";
import Cookies from 'js-cookie';

interface ILoginProps {
    authGateway: IAuthGateway
}
export const Login = ({ authGateway }: ILoginProps) => {
    const name = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    useEffect(() => {
        if (Cookies.get("frontendAuth") === "token") {
            navigate("/search")
        }
    }, [])

    const handleLogin = (e: any) => {
        e.preventDefault()
        authGateway.Login(name.current?.value!, email.current?.value!)
            .then(response => {
                if (response.message === "Please enter your name") {
                    setNameError(true)
                    setEmailError(false)
                } else if (response.message === "Please enter a valid email") {
                    setNameError(false)
                    setEmailError(true)
                } else if (response.status === 200) {
                    setNameError(false)
                    setEmailError(false)
                    Cookies.set("frontendAuth", "token", { expires: 1 / 24 })
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
                {nameError ? <p id="name-error">Please enter your name</p> : null}
                {emailError ? <p id="email-error">Please enter a valid email address</p> : null}
            </form>
        </div>
    )
}