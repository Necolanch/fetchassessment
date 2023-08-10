export interface IDogGateway {
    DogDefault: () => Promise<any>;
    SortZtoA: () => Promise<any>;
    GetBreeds: () => Promise<string[]>;
    GetDogs: () => Promise<any>;
    NextPage: () => Promise<any>;
    PreviousPage: () => Promise<any>;
    Match: () => Promise<any>;
    GetMatch: () => Promise<any>;
}