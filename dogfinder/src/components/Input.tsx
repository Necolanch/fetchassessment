interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    styles: string;
    type: string;
}

export const Input = ({ styles, type, role, onChange, required }: IInputProps) => {
    return (
        <>
            <input className={styles} onChange={onChange} role={role} type={type} required={required} />
        </>
    )
}