const express = require('express');

//IMPORT OF LOGGER.JS FOR PROBLEM 1
const logger  = require('../logger/logger');

//IMPORT OF HELPER.JS FOR PROBLEM 2
const days = require("../util/helper")

//IMPORT OF FORMATTER.JS FOR PROBLEM 3
const formatting = require("../validator/formatter")


const router = express.Router();


//FOR PROBLEM 1
const message =logger.text;

//FOR PROBLEM 2
const date = days.date;
const month = days.month;
const details = days.details;

//FOR PROBLEM 3
const trimming = formatting.trimming;
const lowerCase = formatting.lowerCase;
const upperCase = formatting.upperCase;

router.get('/test-me', function (req, res) {
    //FOR OUTPUT OF PROBLEM 1 
    console.log(message);
    console.log(" ");

    //FOR OUTPUT OF PROBLEM 2
    console.log(date);
    console.log(month);
    console.log(details);
    console.log(" ");

    //FOR OUTPUT OF PROBLEM 3
    name = "  functionUp  "
    console.log("Before trim the string is: "+name);
    name = trimming;
    console.log("After trim the string is: "+trimming);
    console.log("Before applying lowercase the string is: "+name);
    console.log("After applying lowercase the string is: "+lowerCase);
    console.log("Before applying uppercase the string is: "+name);
    console.log("After applying uppercase the string is: "+upperCase);


    res.send('My first ever api!')
});

module.exports = router;
// adding this comment for no reason