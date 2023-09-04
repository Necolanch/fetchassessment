import { ChangeEvent } from "react";

interface IMinAgeFilterProps {
    changeAgeMin: (e: ChangeEvent<HTMLInputElement>) => void;
}

const MinAgeFilter = ({ changeAgeMin }: IMinAgeFilterProps) => {
    return (
        <>
            <div className="mr-4">
                <label htmlFor="minAge">Min Age</label>
                <input className="w-12 ml-2 p-2 h-6 border rounded-md border-slate-800 focus:outline-amber-300" name="minAge" onChange={changeAgeMin} type="number" min={0} />
            </div>
        </>
    )
}

export default MinAgeFilter