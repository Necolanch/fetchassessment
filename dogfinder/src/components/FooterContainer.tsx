import { useAppSelector, useAppDispatch } from "../hooks";
import { DogService } from "../services/dog/dogService";
import { APIGateway } from "../services/APIGateway";
import { setIds } from "../features/dog/dogSlice";
import { setNextPage, setPreviousPage } from "../features/pages/next";
import Footer from "./Footer";

const FooterContainer = () => {
    const apiGateway = new APIGateway();
    const dogService = new DogService(apiGateway);
    const previous = useAppSelector(state => state.pages.previous);
    const next = useAppSelector(state => state.pages.next);
    const dispatch = useAppDispatch();

    const previousPage = () => {
        dogService.PreviousPage()
            .then(response => {
                dispatch(setIds(response.resultIds))
                dispatch(setNextPage(response.next))
                if (response.prev) {
                    dispatch(setPreviousPage(response.prev))
                } else {
                    dispatch(setPreviousPage(""))
                }
            })
    }

    const nextPage = () => {
        dogService.NextPage()
            .then(response => {
                dispatch(setIds(response.resultIds))
                dispatch(setPreviousPage(response.prev))
                if (response.next) {
                    dispatch(setNextPage(response.next))
                } else {
                    dispatch(setNextPage(""))
                }
            })
    }
    return (
        <>
            <Footer previous={previous} next={next} previousPage={previousPage} nextPage={nextPage} />
        </>
    )
}

export default FooterContainer;