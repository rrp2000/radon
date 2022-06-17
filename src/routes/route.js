const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")
const weatherController = require("../controllers/WeatherController")
const memeController = require("../controllers/memeController")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)
router.get("/cowin/getByDist", CowinController.getvaccinationSessionsByDistId)

router.post("/cowin/getOtp", CowinController.getOtp)



router.get("/weather/getWeatherOfLondon",weatherController.weatherOfLondon)
router.get("/weather/getTempOfLondon",weatherController.tempOfLondon)
router.get("/weather/getTempOfPlaces",weatherController.tempOfPlaces)


router.get("/meme/getAllMemes", memeController.allMemes)
router.post("/meme/getTheMeme", memeController.getTheMeme)


// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date



module.exports = router;