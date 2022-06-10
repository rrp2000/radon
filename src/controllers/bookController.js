const { count } = require("console")
const BookModel = require("../models/bookModel")

const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

const getBooksData = async function (req, res) {
    let allBooks = await BookModel.find()
    console.log(allBooks)
    if (allBooks.length > 0) res.send({ msg: allBooks, condition: true })
    else res.send({ msg: "No books found", condition: false })
}

module.exports.createBook = createBook
module.exports.getBooksData = getBooksData

