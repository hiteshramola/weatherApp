import '../../styles/Weather.scss';

import { useContext, useEffect, useState } from 'react';

import { VariablesContext } from '../../context/Variables';

function Weather() {
  const { temprature, feelsLikeTemp, weatherClasses, locationset, weatherMain, message } = useContext(VariablesContext),
    [tempInf, settempInf] = useState(0),
    [feelsLikeTempInf, setfeelsLikeTempInf] = useState(0),
    [showInf, setshowInf] = useState(false);
  const changeTempType = () => {
    showInf ? setshowInf(false) : setshowInf(true);
  }
  const tempConv = (e: string) => {
    let a = parseFloat(e);
    return ((a * 9 / 5) + 32);
  }
  useEffect(() => {
    if (temprature) {
      settempInf(tempConv(temprature))
      setfeelsLikeTempInf(tempConv(feelsLikeTemp))
    }
  }, [temprature, feelsLikeTemp])

  return (
    <>
      {locationset ?
        <div className="weatherCont">
          <div className="weather-icon">
            <i className={"wi " + weatherClasses}></i>
            <h5>{weatherMain}</h5>
          </div>
          <div className="weather-temprature" onClick={changeTempType}>
            {showInf ? <>{tempInf} &#176;F </> : <>{temprature} &#176;C</>}

          </div>
          <div className="weather-feelsLikeTemprature" onClick={changeTempType}>
            Feels Like {showInf ? <>{feelsLikeTempInf} &#176;F </> : <>{feelsLikeTemp} &#176;C</>}
          </div>
        </div> :
        <div className="weatherText">
          {message}
        </div>}
    </>
  );
}

export default Weather;
