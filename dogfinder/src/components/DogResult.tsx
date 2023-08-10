import { Dog } from "../services/dog/IDog";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setMatchIds } from "../features/match/matchSlice";

interface IDogResult {
    dog: Dog;
}

const DogResult = ({ dog }: IDogResult) => {
    const [liked, setLiked] = useState(false);
    const dispatch = useAppDispatch();
    const match = useAppSelector(state => state.match.matchIds);

    const like = (id: string) => {
        dispatch(setMatchIds(id));
        setLiked(true);
    }

    const removeLike = (id: string) => {
        setLiked(false);
        const newMatch = match.filter(dogId => dogId !== id);
        dispatch(setMatchIds(newMatch));
    }

    return (
        <>
            <section>
                <img src={dog.img} alt="Cute doggy" />
                <div>
                    <h4>{dog.name}</h4>
                    {
                        liked ? <AiFillHeart className="hover:cursor-pointer" onClick={() => removeLike(dog.id)} />
                            : <AiOutlineHeart className="hover:cursor-pointer" onClick={() => like(dog.id)} />
                    }
                </div>
                <div>
                    <p>Age: {dog.age}</p>
                    <p>Breed: {dog.breed}</p>
                    <p>ZIP Code: {dog.zip_code}</p>
                </div>
            </section>
        </>
    )
}

export default DogResult;