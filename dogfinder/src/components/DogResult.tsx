import { Dog } from "../services/dog/IDog";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MouseEventHandler } from "react";

interface IDogResult {
    dog: Dog;
    like: MouseEventHandler;
    removeLike: MouseEventHandler;
    liked: boolean
}

const DogResult = ({ dog, like, removeLike, liked }: IDogResult) => {

    return (
        <div className="w-full flex flex-col items-center text-yellow-200">
            <section className="w-3/5 md:w-1/2 lg:w-1/3 xl:w-1/2 xl:h-full bg-cyan-700 p-4 mb-5 rounded-md">
                <img className="w-full" src={dog.img} alt="Cute doggy" />
                <div className="w-full flex items-center justify-center mt-2">
                    <h4 className=" font-semibold text-2xl md:text-3xl">{dog.name}</h4>
                    {
                        liked ? <AiFillHeart className="hover:cursor-pointer w-6 h-6 md:w-8 md:h-8 ml-4" onClick={removeLike} />
                            : <AiOutlineHeart className="hover:cursor-pointer w-6 h-6 md:w-8 md:h-8 ml-4" onClick={like} />
                    }
                </div>
                <div className="md:text-lg">
                    <p>Age: {dog.age}</p>
                    <p>Breed: {dog.breed}</p>
                    <p>ZIP Code: {dog.zip_code}</p>
                </div>
            </section>
        </div>
    )
}

export default DogResult;