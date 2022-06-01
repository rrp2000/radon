const { text } = require("body-parser");

const welcome = function()
{
    return('Welcome to my application. I am Rosan Ranjan Patel and a part of FunctionUp Radon cohort');
}

module.exports.text = welcome();
