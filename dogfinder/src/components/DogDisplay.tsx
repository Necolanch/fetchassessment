import { Dog } from "../services/dog/IDog";
import DogResult from "./DogResult";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setMatchIds } from "../features/match/matchSlice";

interface IDogDisplayProps {
    dogs: Dog[];
}

const DogDisplay = ({ dogs }: IDogDisplayProps) => {
    const [liked, setLiked] = useState<any>({});
    const dispatch = useAppDispatch();
    const match = useAppSelector(state => state.match.matchIds);

    const like = (id: string) => {
        setLiked({ ...liked, [id]: true });
        dispatch(setMatchIds(id));
    }

    const removeLike = (id: string) => {
        setLiked({ ...liked, [id]: false });
        const newMatch = match.filter(dogId => dogId !== id);
        dispatch(setMatchIds(newMatch));
    }

    return (
        <>
            {
                dogs.map(dog => {
                    return (
                        <DogResult liked={liked[dog.id]} removeLike={() => removeLike(dog.id)} like={() => like(dog.id)} key={dog.id} dog={dog} />
                    )
                })

            }
        </>
    )

}

export default DogDisplay;