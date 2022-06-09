const { default: mongoose } = require("mongoose");
const publisherModel = require("../models/publisherModel")

const createPublisher = async function(req, res)
{
    const data = req.body;
    
    const publisherData = await publisherModel.create(data)
    res.send({data: publisherData})
}

const getAllPublisher = async function(req, res)
{
    const allpublishers  = await publisherModel.find()
    res.send({data: allpublishers})
}


module.exports.createPublisher = createPublisher;
module.exports.getAllPublisher = getAllPublisher;