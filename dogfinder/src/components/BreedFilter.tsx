import { APIGateway } from "../services/APIGateway";
import { DogService } from "../services/dog/dogService";
import { useState, useEffect } from "react";
import Checkbox from "./Checkbox";

interface IBreedFilterProps {
    containerStyles: string;
}

const BreedFilter = ({ containerStyles }: IBreedFilterProps) => {
    const apiGateway = new APIGateway();
    const dogService = new DogService(apiGateway);
    const [breedsList, setBreedsList] = useState<string[]>([]);

    useEffect(() => {
        dogService.GetBreeds()
            .then(response => setBreedsList(response));
    }, [])

    return (
        <>
            {
                breedsList.map(breed => {
                    return (
                        <div key={breed} className={containerStyles}>
                            <label className="mr-2">{breed}</label>
                            <Checkbox breed={breed} />
                        </div>
                    )
                })
            }
        </>
    )
}

export default BreedFilter;