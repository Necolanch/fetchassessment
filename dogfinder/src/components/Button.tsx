import { MouseEventHandler } from "react";

interface IButtonProps {
    text: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    styles: string;
}

export const Button = ({ text, onClick, styles }: IButtonProps) => {
    return (
        <>
            <button className={styles} type="submit" onClick={onClick}>{text}</button>
        </>
    )
}