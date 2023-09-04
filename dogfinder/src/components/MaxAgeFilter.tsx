import { ChangeEvent } from "react";

interface IMaxAgeFilterProps {
    changeAgeMax: (e: ChangeEvent<HTMLInputElement>) => void;
}

const MaxAgeFilter = ({ changeAgeMax }: IMaxAgeFilterProps) => {
    return (
        <>
            <div>
                <label htmlFor="maxAge">Max Age</label>
                <input className="w-12 ml-2 h-6 p-2 border rounded-md border-slate-800 focus:outline-amber-300" name="maxAge" onChange={changeAgeMax} type="number" max={20} />
            </div>
        </>
    )
}

export default MaxAgeFilter