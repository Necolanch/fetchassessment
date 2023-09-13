import ProvidedServices from "./ProvidedServices";
import React, { useContext } from "react";

const contexts = new Map<ProvidedServices, React.Context<any | undefined>>();

const Contextualizer = {
    createContext: <T>(service: ProvidedServices): React.Context<T | undefined> => {
        const context = React.createContext<T | undefined>(undefined);
        contexts.set(service, context);
        return context;
    },

    use: <T>(services: ProvidedServices): T => {
        const context = contexts.get(services);
        if (context === undefined) {
            throw new Error(`${ProvidedServices[services]} was not created`)
        }

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const service = useContext(context);

        return service
    },

    clear() {
        contexts.clear()
    }
};

export default Contextualizer;