import AuthServices from "./auth/authServices";
import DogServices from "./dog/dogServices";
import { useAppSelector } from "../hooks";

const GlobalServices = ({ children }: { children: React.ReactNode }) => {
    const results: string[] = useAppSelector(state => state.dog.resultIds);
    const nextPage: string = useAppSelector(state => state.pages.next);
    const previousPage: string = useAppSelector(state => state.pages.previous);
    const breeds: string = useAppSelector(state => state.filter.breeds);
    const ageMin: number | null = useAppSelector(state => state.filter.ageMin);
    const ageMax: number | null = useAppSelector(state => state.filter.ageMax);
    const matchIds: string[] = useAppSelector(state => state.match.matchIds);
    const match: string[] = useAppSelector(state => state.match.match);
    const sort: string = useAppSelector(state => state.filter.sort)
    return (
        <>
            <AuthServices>
                <DogServices results={results} nextPage={nextPage} previousPage={previousPage} breeds={breeds} ageMin={ageMin} ageMax={ageMax} matchIds={matchIds} match={match} sort={sort}>
                    {children}
                </DogServices>
            </AuthServices>
        </>
    )
}

export default GlobalServices;