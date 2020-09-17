//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)



const request = require("request");
const chalk = require("chalk");


const forecast = (lat,lon,callback) => {
    const url = "http://api.weatherstack.com/current?access_key=3a0b3388aefa6c52fe79b7db5a9ddb74&query=" + lat + "," + lon;

    request({uri:url,json:true},(error,response) => {
        if (error) {
            callback(chalk.bgRed.white("Does not exist any internet connection"),undefined);
        }
        else if(response.body.success==false) {
            callback(chalk.bgRed.white("You made wrong query ! Please change your query"));
        }
        else {
            callback(undefined,{
                temperature : response.body.current.temperature,
                weather : response.body.current.weather_descriptions[0],
                windSpeed : response.body.current.wind_speed

            })
        }
    })
}

module.exports = forecast;