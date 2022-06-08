const authorModel = require("../models/authorModel")

const createAuthor = async function(req, res)
{
    const body = req.body
    const savedAuthor = await authorModel.create(body)
    res.send({msg: savedAuthor})
} 

module.exports.createAuthor = createAuthor