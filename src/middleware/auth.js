const jwt = require("jsonwebtoken");
const authToken = async function(req,res,next)
{
    let token = req.headers["X-Auth-Token"]
    if(!token)  token = req.headers["x-auth-token"]
     if(!token) return res.send({ERROR: "TOken is required"})

    const decodedToken = jwt.verify(token,"functionup-radon")
    if(!decodedToken) return req.send({ERROR: "Token is not valid"})
    next()
}
module.exports.authToken = authToken