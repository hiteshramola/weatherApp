import '../../styles/Header.scss';
import "../../styles/weather-icons.min.scss"

import { useContext, useEffect, useState } from 'react';

import { VariablesContext } from '../../context/Variables';
import axios from 'axios';
import { useParams } from 'react-router';

const Header = () => {
    const { cityName }: any = useParams();
    const [location, setlocation] = useState(cityName ? cityName : ""),
        [locationEntered, setlocationEntered] = useState(cityName ? true : false),
        { setresponseData, setlocationset, setloader, setmessage } = useContext(VariablesContext);
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            setmessage("Geolocation is not supported. Please enter a city name to continue.");
            setloader(false);
            setlocationset(false);
        }
    }
    const setParams = (e: {} | any) => {
        setlocationset(true);
        setlocation(e.name);
        setloader(false);
    }
    const showPosition = (position: any) => {
        axios.get('https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=858f15fed9292cbe25c341a754c55e45')
            .then(function (response: any) {
                setresponseData(response.data); setParams(response.data);
                window.history.replaceState(null, "", response.data.name + "," + response.data.sys.country);
            })
            .catch(function (error) {
                setloader(false);
                setmessage(error.message);
                setlocationset(false);
            });
    }
    const showError = (error: any) => {
        setlocationset(false);
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
        if (e.target.value === "") {
            setlocationEntered(false);
        } else { setlocationEntered(true) }
    }
    const keyPressEvt = (e: any) => {
        if (e.charCode === 13) {
            enteredLocation();
        }
    }
    const enteredLocation = () => {
        setloader(true);
        window.history.replaceState(null, "", location);
        if (!locationEntered) {
            getLocation();
        } else {
            axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=858f15fed9292cbe25c341a754c55e45')
                .then(function (response: any) {
                    setresponseData(response.data)
                    setParams(response.data);
                    window.history.replaceState(null, "", response.data.name + "," + response.data.sys.country);
                })
                .catch(function (error) {
                    setloader(false);
                    setmessage(error.response.data.message + ", please enter a valid city name.");
                    setlocationset(false);
                })
        }
    }

    useEffect(() => {
        if (cityName) {
            enteredLocation();
        }
    }, [])

    return (
        <>
            <h4 className="appHeader">The Weather App</h4>
            <div className="searchBar" id="searchBar">
                <input className="locationInput" type="text" placeholder="Location" value={location} onChange={changeLocation} onKeyPress={keyPressEvt} />
                {locationEntered ? <img src="/weatherapp/images/enter.png" alt="" width='30' onClick={enteredLocation} /> : <img src="/weatherapp/images/location.png" alt="" width='30' onClick={enteredLocation} />}
            </div>
        </>
    );
}

export default Header;
