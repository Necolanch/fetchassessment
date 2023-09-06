import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { ChangeEventHandler, FormEventHandler, MouseEventHandler } from "react";

interface IFormProps {
    onChange: ChangeEventHandler<HTMLInputElement>;
    nameError: boolean;
    emailError: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
    onSubmit: FormEventHandler<HTMLFormElement>;
}

const Form = ({ nameError, emailError, onChange, onClick, onSubmit }: IFormProps) => {
    return (
        <form className="w-3/4 md:w-3/5 lg:w-2/5 h-1/2 flex flex-col items-center justify-center bg-slate-50 relative top-1/4 p-4 rounded-md shadow-md shadow-teal-500" id="login-form" role="login" onSubmit={onSubmit}>
            <div className="w-screen h-20 flex justify-center items-center">
                <h1 className="font-light text-2xl text-cyan-950 text-center">NewHome</h1>
                <img src={require("../img/pawprint.png")} alt="Pawprint" width={30} height={30} />
            </div>
            <label htmlFor="">Name</label>
            <Input type="text" role="name" styles="rounded-sm border border-slate-800 outline-teal-700 p-1" onChange={onChange} />
            <label className="mt-4" htmlFor="">Email</label>
            <Input type="email" role="email" styles="rounded-sm border border-slate-800 outline-teal-700 p-1" onChange={onChange} />
            <Button styles="mt-4 p-2 w-20 bg-teal-400 font-medium rounded-sm" text="Login" onClick={onClick}></Button>
            {nameError ? <p id="name-error">Please enter your name</p> : null}
            {emailError ? <p id="email-error">Please enter a valid email address</p> : null}
        </form>
    )
}

export default Form;