import React from "react";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    styles: string;
}

export const Button = ({ text, onClick, styles, ...restProps }: IButtonProps) => {
    return (
        <>
            <button className={styles} type="submit" onClick={onClick}>{text}</button>
        </>
    )
}