
interface ICheckboxProps {
    onClick: (e: any) => void;
}

const Checkbox = ({ onClick }: ICheckboxProps) => {
    return (
        <>
            <input type="checkbox" onClick={onClick} />
        </>
    )
}

export default Checkbox;