const express = require('express');

//IMPORT OF LOGGER.JS FOR PROBLEM 1
const logger  = require('../logger/logger');

//IMPORT OF HELPER.JS FOR PROBLEM 2
const days = require("../util/helper")

//IMPORT OF FORMATTER.JS FOR PROBLEM 3
const formatting = require("../validator/formatter")

//IMPORT FOR PROBLEM 4
const lodash = require("lodash")


const router = express.Router();


router.get('/test-me', function (req, res) {
    //FOR OUTPUT OF PROBLEM 1 
    logger.text();
    console.log(" ");

    //FOR OUTPUT OF PROBLEM 2
    days.date();
    days.month();
    days.details();
    console.log(" ");

    //FOR OUTPUT OF PROBLEM 3
    let name = "  functionUp  "
    console.log("Before trim the string is: "+name);
    console.log("After trim the string is: ");
    formatting.trimming();
    name = name.trim();
    console.log("Before applying lowercase the string is: "+name);
    console.log("After applying lowercase the string is: ");
    formatting.lowerCase()
    console.log("Before applying uppercase the string is: "+name);
    console.log("After applying uppercase the string is: ");
    formatting.upperCase()


    res.send('My first ever api!')
});

router.get('/hello', function (req, res) {

    let monthNames = ['jan','feb','mar','apr','may','jun','jul','aug','sept','oct','nov','dec'];
    let chunkedArray = lodash.chunk(monthNames,4);
    console.log(chunkedArray);

    let oddNums = [1,3,5,7,9,11,13,15,17,19]
    let tailedArray = lodash.tail(oddNums);
    console.log(tailedArray);

    let num1 = [1,2,3];
    let num2 = [2,3,4];
    let num3 = [3,4,5];
    let num4 = [4,5,6];
    let num5 = [5,6,7];
    let uniqueArray = lodash.union(num1,num2,num3,num4,num5);
    console.log(uniqueArray);

    let movies = [["Horror","conjuring"],["Drama","Titanic"],["Anime","Naruto"]];
    let movieCatagorized = lodash.fromPairs(movies);
    console.log(movieCatagorized);


    res.send('This is the api for problem 4')
})

module.exports = router;
// adding this comment for no reason