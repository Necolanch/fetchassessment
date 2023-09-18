
interface ICheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const Checkbox = ({ onClick }: ICheckboxProps) => {
    return (
        <>
            <input type="checkbox" onClick={onClick} />
        </>
    )
}

export default Checkbox;