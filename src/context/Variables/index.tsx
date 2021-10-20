import { createContext, useState } from 'react';

const VariablesContext = createContext({
    responseData: {} as any,
    setresponseData: (responseData: Object) => { },
    locationset: false,
    setlocationset: (locationset: boolean) => { },
    loader: false,
    setloader: (loader: boolean) => { },
    message: "Search for a location to get the weather or click the marker to get the weather.",
    setmessage: (message: string) => { },
});

const VariablesProvider = ({ children }: any) => {
    const [responseData, setresponseData] = useState({}),
        [message, setmessage] = useState("Search for a location to get the weather or click the marker to get the weather."),
        [locationset, setlocationset] = useState(false),
        [loader, setloader] = useState(false);


    return (
        <VariablesContext.Provider
            value={{
                responseData,
                setresponseData,
                locationset,
                setlocationset,
                loader,
                setloader,
                message,
                setmessage
            }}
        >
            {children}
        </VariablesContext.Provider>
    );
}

export { VariablesProvider, VariablesContext };