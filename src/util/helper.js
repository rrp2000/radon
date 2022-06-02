const printDate = function()
{
    console.log("Today's date is 1 june 2022")
}

const printMonth = function()
{
    console.log("The month is June")
}

const getBatchInfo = function()
{
    console.log("Radon,W3D3, the topic for today is Nodejs module system")
}

module.exports.date = printDate;
module.exports.month = printMonth;
module.exports.details = getBatchInfo;