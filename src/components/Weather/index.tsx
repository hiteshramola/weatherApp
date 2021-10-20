import '../../styles/Weather.scss';
import '../../styles/weather-icons-wind.min.scss';

import { useContext, useEffect, useState } from 'react';

import { VariablesContext } from '../../context/Variables';

function Weather() {
  const { responseData, locationset, message } = useContext(VariablesContext),
    [tempInf, settempInf] = useState("0"),
    [feelsLikeTempInf, setfeelsLikeTempInf] = useState("0"),
    [weatherClasses, setweatherClasses] = useState("wi-cloud-refresh"),
    [showInf, setshowInf] = useState(false);
  const changeTempType = () => {
    showInf ? setshowInf(false) : setshowInf(true);
  }
  const tempConv = (e: number) => {
    return parseFloat((((e - 273.15) * 9 / 5) + 32).toString()).toFixed(2);
  }
  const convertTemp = (e: number) => {
    return parseFloat((e - 273.15).toString()).toFixed(1);
  }
  useEffect(() => {
    if (responseData.main && responseData.main.temp) {
      settempInf(tempConv((responseData.main.temp)))
      setfeelsLikeTempInf(tempConv((responseData.main.feels_like)))
      switch (responseData.weather[0].main) {
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
        case "Mist":
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
    }
  }, [responseData]);

  return (<>
    {locationset ?
      <div className="weatherCont">
        <div className="weather-icon">
          <span className="colorCircle"></span>
          <i className={"wi " + weatherClasses}></i>
          <h5>{responseData.weather[0].description}</h5>
        </div>
        <div className="weather-temprature" onClick={changeTempType}>
          {showInf ? <>{tempInf} &#176;F </> : <>{convertTemp(responseData.main.temp)} &#176;C</>}

        </div>
        <div className="weather-feelsLikeTemprature" onClick={changeTempType}>
          Feels Like {showInf ? <>{feelsLikeTempInf} &#176;F </> : <>{convertTemp(responseData.main.feels_like)} &#176;C</>}
        </div>

        <div className="sunTime">
          <span>
            Sunrise Time
            <i className={"wi wi-sunrise"}></i>
            {new Date(responseData.sys.sunrise * 1000).toDateString() + " at " + new Date(responseData.sys.sunrise * 1000).toLocaleTimeString()}
          </span>
          <span>
            Sunset Time
            <i className={"wi wi-sunset"}></i>
            {new Date(responseData.sys.sunset * 1000).toDateString() + " at " + new Date(responseData.sys.sunset * 1000).toLocaleTimeString()}
          </span>
        </div>

        <div className="otherWeatherDetails">
          <span><i className={"wi wi-humidity"}></i> : {responseData.main.humidity} %</span>
          <span><i className={"wi wi-barometer"}></i> : {responseData.main.pressure} hPa</span>
          <span><i className={"wi wi-wind towards-" + responseData.wind.deg + "-deg"}></i> : {responseData.wind.speed} m/s</span>
        </div>
      </div> :
      <div className="weatherText">
        {message}
      </div>}
  </>
  );
}

export default Weather;
