let name = "  FunctionUp  ";

let trimmer = function()
{
    name = name.trim();
    console.log(name);
}

let changeToLowerCase = function()
{
    console.log(name.toLowerCase());
}

let changeToUpperCase = function()
{
    console.log(name.toUpperCase())
}

module.exports.trimming = trimmer;
module.exports.lowerCase = changeToLowerCase;
module.exports.upperCase = changeToUpperCase;

