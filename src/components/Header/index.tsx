import '../../styles/Header.scss';
import "../../styles/weather-icons.min.scss"

import { useContext, useState } from 'react';

import { VariablesContext } from '../../context/Variables';
import axios from 'axios';

const Header = () => {
    const [location, setlocation] = useState(""),
        [locationEntered, setlocationEntered] = useState(false),
        { setweatherClasses, settemprature, setfeelsLikeTemp, setlocationset, setloader, setweatherMain, setmessage } = useContext(VariablesContext);
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            setmessage("Geolocation is not supported. Please enter a city name to continue.");
            setloader(false);
        }
    }
    const setParams = (e: {} | any) => {
        setlocationset(true);
        settemprature(convertTemp(e.main.temp));
        setfeelsLikeTemp(convertTemp(e.main.feels_like));
        setlocation(e.name);
        setweatherMain(e.weather[0].description);
        switch (e.weather[0].main) {
            case "Haze":
                setweatherClasses("wi-day-haze");
                break;
            case "Clear":
                setweatherClasses("wi-day-sunny");
                break;
            case "Clouds":
                setweatherClasses("wi-cloudy");
                break;
            case "Rain":
            case "Hail":
                setweatherClasses("wi-rain");
                break;
            case "Snow":
                setweatherClasses("wi-snow");
                break;
            case "Cloudy":
                setweatherClasses("wi-cloudy");
                break;
            case "Smog":
                setweatherClasses("wi-smog");
                break;
            case "Fog":
                setweatherClasses("wi-fog");
                break;
            case "Thunderstorm":
                setweatherClasses("wi-storm-showers");
                break;
            case "Windy":
                setweatherClasses("wi-strong-wind");
                break;
            default:
                setweatherClasses("wi-thermometer");
                break;
        }
        setloader(false);
    }
    const showPosition = (position: any) => {
        axios.get('https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=858f15fed9292cbe25c341a754c55e45')
            .then(function (response: any) { setParams(response.data) })
            .catch(function (error) {
                setloader(false);
                setmessage(error.message);
            });
    }
    const showError = (error: any) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                setmessage("Denied the request for location. Please enable your location or enter a city name to continue.");
                setloader(false);
                break;
            case error.POSITION_UNAVAILABLE:
                setmessage("Location information is unavailable. Please enable your location or enter a city name to continue.");
                setloader(false);
                break;
            case error.TIMEOUT:
                setmessage("The request to get user location timed out. Please retry or enter a city name to continue.");
                setloader(false);
                break;
            case error.UNKNOWN_ERROR:
                setmessage("An unknown error occurred. Please retry or enter a city name to continue.");
                setloader(false);
                break;
        }
    }
    const changeLocation = (e: any) => {
        setlocation(e.target.value);
        if (e.target.value == "") {
            setlocationEntered(false);
        } else { setlocationEntered(true) }
    }
    const convertTemp = (e: number) => {
        return parseFloat((e - 273.15).toString()).toFixed(1);
    }
    const enteredLocation = () => {
        setloader(true);
        if (!locationEntered) {
            getLocation();
        } else {
            axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=858f15fed9292cbe25c341a754c55e45')
                .then(function (response: any) {
                    setParams(response.data);
                })
                .catch(function (error) {
                    setloader(false);
                    setmessage(error.response.data.message + ", please enter a valid city name.");
                })
        }
    }
    return (
        <>
            <h4 className="appHeader">The Weather App</h4>
            <div className="searchBar" id="searchBar">
                <input className="locationInput" type="text" placeholder="Location" value={location} onChange={changeLocation} />
                {locationEntered ? <img src="/images/enter.png" alt="" width='30' onClick={enteredLocation} /> : <img src="/images/location.png" alt="" width='30' onClick={enteredLocation} />}
            </div>
        </>
    );
}

export default Header;
