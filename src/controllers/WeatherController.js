let axios = require("axios")

const weatherOfLondon = async function (req, res) {
    // let key = req.headers.weatherkey
    try {
        let options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=London&appid=b7562825dac21eac8cfc4457578614a7`
        }
        let wetherOflondon = await axios(options)
        res.status(200).send({ msg: wetherOflondon.data })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}
const tempOfLondon = async function (req, res) {
    // let key = req.headers.weatherkey
    try {
        let options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=London&appid=b7562825dac21eac8cfc4457578614a7`
        }
        let wetherOflondon = await axios(options)
        res.status(200).send({ msg: wetherOflondon.data.main.temp })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}
const tempOfPlaces = async function (req, res) {
    try {
        let places = ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let citiesWithTemp = []
        for(let i = 0; i<places.length; i++)
        {
            cities = {city:places[i]}
            let options = {

                method: "get",
                url: `http://api.openweathermap.org/data/2.5/weather?q=${places[i]}&appid=b7562825dac21eac8cfc4457578614a7`

            }
            
            let temps = await axios(options)
            cities.temp = temps.data.main.temp

            citiesWithTemp.push(cities)
        }
        

       sortedCities = citiesWithTemp.sort(function(a,b){return a.temp - b.temp})
        res.status(200).send({ msg: sortedCities })


    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports.weatherOfLondon = weatherOfLondon
module.exports.tempOfLondon = tempOfLondon
module.exports.tempOfPlaces = tempOfPlaces