/*
const url = "http://api.weatherstack.com/current?access_key=3a0b3388aefa6c52fe79b7db5a9ddb74&query=New York"

const http = require("http");


const request = http.request(url,(response) => {
    let data = []
    response.on("data",(subdata) => {
        data.push(subdata);
    })
    response.on("end",() => {
        dataJSON = JSON.parse(data);
        const city = dataJSON.request.query;
        const weather = dataJSON.current.weather_descriptions
    })
    response.on("error",(error) => {
        console.log("An error occured");
    })
})
// this code does not run because , require method does not implement browser reason why does not exist there
*/


/*
fetch("http://api.weatherstack.com/current?access_key=3a0b3388aefa6c52fe79b7db5a9ddb74&query=New%20York")
.then((data) => {
    data.json()
    .then((subdata) => {
        const city = subdata.request.query;
        const weather = subdata.current.weather_descriptions[0]
        
        console.log("City : ",city);
        console.log("Weather : ",weather);
        
    })
})

*/

const weatherForm = document.querySelector("form");
const input = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

//messageOne.innerHTML = "From me"
//messageTwo.textContent = "From me ,too"

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent disappeared
    const location = input.value;
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    const url = "http://api.weatherstack.com/current?access_key=3a0b3388aefa6c52fe79b7db5a9ddb74&query=" + location;
    fetch(url)
        .then((response) => {
            response.json()
                .then((data) => {                    
                    if (data.success == false) {
                        messageOne.textContent="This place did not found, please search again";
                    } else {
                        const city = data.request.query;
                        const weather = data.current.weather_descriptions[0]
                        const temperature = data.current.temperature
                        messageTwo.innerHTML = (`${city} , weather is ${weather} , temperature is ${temperature}`);
                    }                    
                })
        })
})
