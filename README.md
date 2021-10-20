# Simple Weather App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It shows weather according to user search preference or location.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3200](http://localhost:3200) to view it in the browser.

The main page will show a basic UI with an input box for user to enter their location.

User can also choose to automatically get location by clicking the marker just beside the input box and giving location permission to browser.

The application shows a graphical representation of the weather with temprature which can be changed to Fahrenheit or Celcius on click of the temprature shown.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

##
## Things I would like to implement more on this app:
 - Dark mode implementation
 - Give country and city dropdown for better UX and ease.
 - Day and night dynamic theme according to user/location time.
 - Few more animations for a lively UX.
 - 16 day weather forecast.
 - Sunrise and sunset timings
 - Wind, Pressure and Humidity forecast.
 - Daily / Hourly forecast.
  - Making the API request common so other components can make use of the API without defining them again.
 - Better error handling for application.
 - Using dynamic URL for city search eg: www.weatherapp.com/delhi will show forecast for Delhi directly.
