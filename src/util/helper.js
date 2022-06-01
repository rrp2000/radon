const printDate = function()
{
    return("Today's date is 1 june 2022")
}

const printMonth = function()
{
    return("The month is June")
}

const getBatchInfo = function()
{
    return("Radon,W3D3, the topic for today is Nodejs module system")
}

module.exports.date = printDate();
module.exports.month = printMonth();
module.exports.details = getBatchInfo();