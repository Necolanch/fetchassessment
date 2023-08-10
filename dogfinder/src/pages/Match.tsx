import { useState, useEffect } from "react";
import { APIGateway } from "../services/APIGateway";
import { DogService } from "../services/dog/dogService";
import { useAppSelector, useAppDispatch } from "../hooks";
import { Dog } from "../services/dog/IDog";
import { setMatch } from "../features/match/matchSlice";

const Match = () => {
    const apiGateway = new APIGateway();
    const dogService = new DogService(apiGateway);
    const matchIds = useAppSelector(state => state.match.matchIds);
    const match = useAppSelector(state => state.match.match)
    const dispatch = useAppDispatch();
    const [dogMatch, setDogMatch] = useState<Dog[]>([]);

    useEffect(() => {
        dogService.Match()
            .then(response => response.json())
            .then(data => dispatch(setMatch([data.match])))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        dogService.GetMatch()
            .then(response => response.json())
            .then(data => setDogMatch(data))
            .catch(err => console.log(err))
    }, [match])

    console.log(dogMatch)
    return (
        <>
            {
                dogMatch.length === 0 ? (<p>Like some dogs first before generating your match</p>)
                    : (
                        <section>
                            <img src={dogMatch[0].img} alt="Cute doggy" />
                            <div>
                                <h4>{dogMatch[0].name}</h4>
                            </div>
                            <div>
                                <p>Age: {dogMatch[0].age}</p>
                                <p>Breed: {dogMatch[0].breed}</p>
                                <p>ZIP Code: {dogMatch[0].zip_code}</p>
                            </div>
                        </section>
                    )
            }
        </>
    )
}

export default Match;