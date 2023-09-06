import Form from "./Form";
import { ChangeEvent, useState, useEffect, FormEvent, MouseEvent } from "react";
import { IAuthGateway } from "../services/auth/IAuthGateway";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

interface IFormContainerProps {
    authGateway: IAuthGateway
}

const FormContainer = ({ authGateway }: IFormContainerProps) => {
    const [inputState, setInputState] = useState<any>({ name: { value: "", error: false }, email: { value: "", error: false } });
    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get("frontendAuth") === "token") {
            navigate("/search")
        }
    }, [])

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputState({
            ...inputState,
            [e.target.role as string]: {
                value: e.target.value,
                error: inputState[e.target.role as string].error
            }
        })
    }

    const onSubmit = (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        authGateway.Login(inputState.name.value, inputState.email.value)
            .then(response => {
                if (response.message === "Please enter your name") {
                    setInputState({
                        name: {
                            value: inputState.name.value,
                            error: true
                        },
                        email: {
                            value: inputState.email.value,
                            error: false
                        }
                    })
                } else if (response.message === "Please enter a valid email") {
                    setInputState({
                        name: {
                            value: inputState.name.value,
                            error: false
                        },
                        email: {
                            value: inputState.email.value,
                            error: true
                        }
                    })
                } else if (response.status === 200) {
                    setInputState({
                        name: {
                            value: inputState.name.value,
                            error: false
                        },
                        email: {
                            value: inputState.email.value,
                            error: false
                        }
                    })
                    Cookies.set("frontendAuth", "token", { expires: 1 / 24 })
                    navigate("/search");
                }
            })
            .catch(err => console.log(err));
    }
    return (
        <>
            <Form emailError={inputState.email.error} nameError={inputState.name.error} onSubmit={(e) => onSubmit(e)} onClick={(e) => onSubmit(e)} onChange={(e) => onChange(e)} />
        </>
    )
}

export default FormContainer;