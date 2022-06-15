const jwt = require("jsonwebtoken");
const authToken = async function(req,res,next)
{
    //authentication
    let token = req.headers["X-Auth-Token"]
    if(!token)  token = req.headers["x-auth-token"]
     if(!token) return res.send({ERROR: "TOken is required"})

    const decodedToken = jwt.verify(token,"functionup-radon")
    console.log(decodedToken)
    if(!decodedToken) return req.send({ERROR: "Token is not valid"})


    //authorization
    let body = req.params
    if(decodedToken.userId === body.userId){
        next()
    }
    else{
        res.send({ERROR: "You aren't authorized for this action"})
    }
}
module.exports.authToken = authToken 