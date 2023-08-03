interface IInputProps {
    styles: string;
    type: string;
    reference: React.MutableRefObject<HTMLInputElement | null>;
    role: string;
}

export const Input = ({ styles, type, role, reference }: IInputProps) => {
    return (
        <>
            <input className={styles} ref={reference} role={role} type={type} required />
        </>
    )
}