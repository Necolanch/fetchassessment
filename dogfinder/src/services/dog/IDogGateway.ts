export interface IDogGateway {
    dogDefault: () => Promise<any>;
    getBreeds: () => Promise<string[]>;
    getDogs: () => Promise<any>;
    nextPage: () => Promise<any>;
    previousPage: () => Promise<any>;
    //Match: () => Promise<any>;
    //GetMatch: () => Promise<any>;
}