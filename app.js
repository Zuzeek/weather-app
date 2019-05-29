// we are going to use the Dark Sky API to get some weather data 
// sign up to DarkSky.net/dev


// require request
const request = require('request')

// // get data from operating system and display on the console 
// // look at OS -> display that
// const os = require('os'); 

// get user input

let input = process.argv[2]

const keyMapBox = 'pk.eyJ1IjoiYW5uYWdyb3N6ZWsiLCJhIjoiY2p3OWJsdGY2MGE0cTQ4a2JsMzRmYmZobyJ9.cNFhrFPAAAtacq8uzXXWPQ'
const mapBoxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?access_token=${keyMapBox}`

const encoded = encodeURI(mapBoxURL)

request(encoded, (err, res) => {
    // console.log(err)
    // we need to take JSON object and change it to object
    const data = JSON.parse(res.body) 

    let long = data.features[0].geometry.coordinates[0]; 
    let lat = data.features[0].geometry.coordinates[1]

    // no need for this, as we are declaring long and lat above:
    // need to access output.json object features[0].geometry.coordinates
    // console.log(data.features[0].geometry.coordinates) //(res.body)

    // store the sample API from DarkSky call in a variable called url 
    const url = `https://api.darksky.net/forecast/4116e96820053585936415cf3201c3da/${lat},${long}`
    
    request({url: url, json: true}, (error, response) => {
        if (error) {
            console.log("oops, can't connect to darkSky. Check internet connection")
        } 
        else {
            // parse -> takes the JSON object and changes it to JS object 
            // if we set JSON to true we won't need to use JSON.parse 
            const data = response.body // JSON.parse(response.body) 
            console.log(data.currently)
        }
    })
})

