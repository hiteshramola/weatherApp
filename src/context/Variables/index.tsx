import { createContext, useState } from 'react';

const VariablesContext = createContext({
    weatherClasses: "",
    setweatherClasses: (weatherClasses: string) => { },
    temprature: "",
    settemprature: (temprature: string) => { },
    feelsLikeTemp: "",
    setfeelsLikeTemp: (feelsLikeTemp: string) => { },
    locationset: false,
    setlocationset: (locationset: boolean) => { },
    weatherMain: "",
    setweatherMain: (weatherMain: string) => { },
    loader: false,
    setloader: (loader: boolean) => { },
    message: "Search for a location to get the weather or click the marker to get the weather.",
    setmessage: (message: string) => { }
});

const VariablesProvider = ({ children }: any) => {
    const [weatherClasses, setweatherClasses] = useState("wi-cloud-refresh"),
        [temprature, settemprature] = useState(""),
        [feelsLikeTemp, setfeelsLikeTemp] = useState(""),
        [weatherMain, setweatherMain] = useState(""),
        [message, setmessage] = useState("Search for a location to get the weather or click the marker to get the weather."),
        [locationset, setlocationset] = useState(false),
        [loader, setloader] = useState(false);

    return (
        <VariablesContext.Provider
            value={{
                weatherClasses,
                setweatherClasses,
                temprature,
                settemprature,
                feelsLikeTemp,
                setfeelsLikeTemp,
                locationset,
                setlocationset,
                weatherMain,
                setweatherMain,
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