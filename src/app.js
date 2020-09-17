const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geoCode = require("./utils/geoCode");

const app = express();
const port = process.env.PORT || 8080;

const publicDirectory = path.join(__dirname,"../public");
const viewsDirectory = path.join(__dirname,"../templates/views");
const partialsDirectory = path.join(__dirname,"../templates/partials");

// add handlebars addition and it's location
app.set("view engine","hbs");
app.set("views",viewsDirectory);
hbs.registerPartials(partialsDirectory);

// setup static directory which includes styles e.g files
app.use(express.static(publicDirectory));


app.get("",(req,res) => {
    res.render("main",{
        title : "Weather",
        name : "This page created by Kivanc"
    });
})

app.get("/me",(req,res) => {
    res.render("me",{
        title : "About Me",
        name : "This page created by Kivanc"
    });
})

app.get("/help",(req,res) => {
    res.render("help",{
        title : "Help Page",
        name : "This page created by Kivanc"
    });
})

app.get("/products",(req,res) => {
    if(!req.query.search) {
        return res.send({
            error : "You must provide search query"
        })
    }
    console.log(req.query.search);
    res.send({
        products : []
    })
})

app.get("/weather",(req,res) => {
    if(!req.query.address){
        return res.send({
            error : "You must provide an adress"
        })
    }
    geoCode(req.query.address,(error,{latitude,longtitude,location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude,longtitude,(error,{temperature,weather,windSpeed}) => {
            if (error) {
                return res.send({error})
            }
            console.log("Error", error);
            res.send({
                location : location,
                weather : weather,
                temperature : temperature,
                windSpeed : windSpeed
            })
        })
        /*
        console.log("Error : ", error);
        console.log("Latitude : ", longtitude);
        console.log("Longtitude : ", longtitude);
        console.log("Location : ", location);
        */
    })
})

app.get("*",(req,res) => {
    res.render("404",{
        title : "404",
        name : "This page created by Kivanc",
        errorMessage : "This page did not found"
    })
})


app.get("/help/*",(req,res) => {
    res.render("404",{
        title : "404",
        name : "This page created by Kivanc",
        errorMessage : "This page did not found"
    })
})
app.get("/me/*",(req,res) => {
    res.render("404",{
        title : "404",
        name : "This page created by Kivanc",
        errorMessage : "This page did not found"
    })
})



app.listen(port,() => {
    console.log("Server is available on ",port);
});


