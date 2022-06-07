const { request } = require("express")
const bookModel = require("../models/bookModel")

const createBook = async function(req, res)
{
    let data= req.body
    let savedData = await bookModel.create(data)
    res.send({msg: savedData})
}

const bookList = async function(req, res)
{
    let allBooks = await bookModel.find().select({bookName:1,aurhorName:1,_id:0})
    res.send({msg: allBooks})
}

const getBooksInYear = async function(req, res)
{
    let request = req.body
    let getYear = Object.values(request)
    let booksInYear = await bookModel.find({year: getYear}).select({bookName:1,_id:0})
    res.send({msg: booksInYear})
}

const getParticularBooks = async function(req, res)
{
    let request = req.body
    let desiredOutput = await bookModel.find(request)
    res.send({msg: desiredOutput})
}

const getXINRBooks = async function(req, res)
{
    let booksWithPrices = await bookModel.find({$or:[{"price.indPrice":100},{"price.indPrice":200},{"price.indPrice":500}]})
    res.send({msg: booksWithPrices})

}

const getRandomBooks = async function(req, res)
{
    let randomBooks = await bookModel.find({$or:[{stockAvailable:true},{totalPages:{$gt:500}}]})
    res.send({msg: randomBooks})
}
module.exports.createBook = createBook
module.exports.bookList = bookList
module.exports.getBooksInYear = getBooksInYear
module.exports.getParticularBooks = getParticularBooks
module.exports.getXINRBooks = getXINRBooks
module.exports.getRandomBooks = getRandomBooks