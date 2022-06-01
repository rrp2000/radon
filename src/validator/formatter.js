let name = "  FunctionUp  ";

let trimmer = function()
{
    name = name.trim();
    return(name);
}

let changeToLowerCase = function()
{
    return(name.toLowerCase());
}

let changeToUpperCase = function()
{
    return(name.toUpperCase())
}

module.exports.trimming = trimmer();
module.exports.lowerCase = changeToLowerCase();
module.exports.upperCase = changeToUpperCase();

