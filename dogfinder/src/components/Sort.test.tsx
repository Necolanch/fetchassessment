import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sort from "./Sort";
import { DogService } from "../services/dog/dogService";
import { APIGateway } from "../services/APIGateway";

const apiGateway = new APIGateway();
const dogService = new DogService(apiGateway);

describe("Sort", () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const sortAtoZ = () => { dogService.DogDefault().then(response => console.log(response)) }
    const sortZtoA = () => { dogService.SortZtoA() }
    const setup = () => render(<Sort styles="" sortAtoZ={sortAtoZ} sortZtoA={sortZtoA} />)

    it("Should render", () => {
        setup();
        const select = screen.getByRole("sort");
        expect(select).not.toBeNull();
    })

    it("Should execute sorting from A to Z", () => {
        setup();
        const select = screen.getByRole("sort");
        userEvent.click(select);
        const sortAtoZ = screen.getByRole("atoz");
        userEvent.click(sortAtoZ);
    })
})