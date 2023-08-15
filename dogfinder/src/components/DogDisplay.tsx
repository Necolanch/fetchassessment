import { Dog } from "../services/dog/IDog";
import DogResult from "./DogResult";

interface IDogDisplayProps {
    dogs: Dog[];
}

const DogDisplay = ({ dogs }: IDogDisplayProps) => {
    return (
        <>
            {
                dogs.map(dog => {
                    return (
                        <DogResult key={dog.id} dog={dog} />
                    )
                })

            }
        </>
    )

}

export default DogDisplay;