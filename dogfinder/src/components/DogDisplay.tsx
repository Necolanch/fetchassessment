
import { Dog } from "../services/dog/IDog";
import DogResult from "./DogResult";

interface IDogDisplayProps {
    dogs: Dog[];
}

const DogDisplay = ({ dogs }: IDogDisplayProps) => {
    /* const apiGateway = new APIGateway();
    const dogService = new DogService(apiGateway);
    const dispatch = useAppDispatch();
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [loading, setLoading] = useState(false);
    const resultIds = useAppSelector(state => state.dog.resultIds);

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
    }, [resultIds]); */

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