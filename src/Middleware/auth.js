
const jwt = require("jsonwebtoken");
const blogModel = require("../model/blogModel");


const authenticate = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];

        if (!token) return res.send({ status: false, msg: "token must be present" });

        let decodedToken = jwt.verify(token,"Roshan");

        if (!decodedToken) {

            return res.status(401).send({ status: false, msg: "token is invalid" });
        }

        req.authorId = decodedToken.authorId
        next()
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}
module.exports.authenticate = authenticate
