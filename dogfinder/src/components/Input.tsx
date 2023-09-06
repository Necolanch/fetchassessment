import { ChangeEventHandler } from "react";

interface IInputProps {
    styles: string;
    type: string;
    role: string;
    onChange: ChangeEventHandler<HTMLInputElement>
}

export const Input = ({ styles, type, role, onChange }: IInputProps) => {
    return (
        <>
            <input className={styles} onChange={onChange} role={role} type={type} required />
        </>
    )
}