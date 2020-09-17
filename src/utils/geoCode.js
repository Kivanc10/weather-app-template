const request = require("request");
const chalk = require("chalk")

const geoCode = (address,callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1Ijoia2l2YW5jMTAiLCJhIjoiY2tlNWxrZ3NoMDZtbjJzcGR1eWl2Nzg2byJ9.iVbj-htHw8HfOMK40MCeSA"

    request({uri:url,json:true},(error,response) => {
        if (error) {
            callback(chalk.bgRed.white("Does not exist any internet connection"),undefined);
        }
        else if(response.body.features.length==0) {
            callback(chalk.white.bgRed("Not Found !Please adjust your search"),undefined);
        }
        else {
            callback(undefined,{
                latitude : response.body.features[0].center[0],
                longtitude : response.body.features[0].center[1],
                location : response.body.features[0].place_name
            })
        }
    })
}


module.exports = geoCode;