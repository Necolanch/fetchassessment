import { ChangeEvent } from "react";
import { Input } from "./Input";

interface IMinAgeFilterProps {
    changeAge: (e: ChangeEvent<HTMLInputElement>) => void;
    labelText: string;
    containerStyle: string;
    name: string;
}

const MinAgeFilter = ({ changeAge, labelText, containerStyle, name }: IMinAgeFilterProps) => {
    return (
        <>
            <div className={containerStyle}>
                <label htmlFor={name}>{labelText}</label>
                <Input styles="w-12 ml-2 p-2 h-6 border rounded-md border-slate-800 focus:outline-amber-300" name={name} onChange={changeAge} type="number" min={0} max={20} required={false} />
            </div>
        </>
    )
}

export default MinAgeFilter