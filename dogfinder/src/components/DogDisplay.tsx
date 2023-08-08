import { useState, useEffect } from "react";
import { APIGateway } from "../services/APIGateway";
import { DogService } from "../services/dog/dogService";
import { Dog } from "../services/dog/IDog";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setIds } from "../features/dog/dogSlice";

const DogDisplay = () => {
    const apiGateway = new APIGateway();
    const dogService = new DogService(apiGateway);
    const dispatch = useAppDispatch();
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [loading, setLoading] = useState(false);
    const resultIds = useAppSelector(state => state.dog.resultIds);
    console.log(dogs);

    useEffect(() => {
        dogService.DogDefault()
            .then((response) => {
                dispatch(setIds(response.resultIds))
            })


    }, [])

    useEffect(() => {
        dogService.GetDogs()
            .then(res => res.json())
            .then(data => setDogs(data))

        setLoading(true)
    }, [resultIds]);

    return (
        <>
            {
                loading ? dogs.map(dog => {
                    return (
                        <section key={dog.id}>
                            <img src={dog.img} alt="Cute doggy" />
                            <h4>{dog.name}</h4>
                            <div>
                                <p>{dog.age}</p>
                                <p>{dog.breed}</p>
                                <p>{dog.zip_code}</p>
                            </div>

                        </section>
                    )
                }) : (
                    <p>Loading...</p>
                )

            }
        </>
    )

}

export default DogDisplay;