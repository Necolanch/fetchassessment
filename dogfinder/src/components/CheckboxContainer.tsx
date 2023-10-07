import Checkbox from "./Checkbox";

interface ICheckboxContainerProps {
    breed: string;
    filterBreed: (checked: boolean, breed: string) => void;
}
const CheckboxContainer = ({ breed, filterBreed }: ICheckboxContainerProps) => {
    return (
        <>
            <div key={breed}>
                <label className="mr-2">{breed}</label>
                <Checkbox onClick={(e: any) => filterBreed(e.target?.checked, breed)} />
            </div>
        </>
    )
}

export default CheckboxContainer;