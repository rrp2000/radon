const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel = require("../models/publisherModel")

const createBook= async function (req, res) {
    let book = req.body
    let authorId = await authorModel.findById(book.author)
    let publisherId = await publisherModel.find(book.publisher)
    if(!book.author&& !book.publisher)
    {
        res.send("ERROR: author and publisher data is required.")
    }
    else if(!book.author)
    {
        res.send("ERROR: author data is required.")
    }
    else if(!book.publisher)
    {
        res.send("ERROR: Publisher data is required.")
    }
    else
    {
        if(!authorId && !publisherId)
        {
            res.send("ERROR: Enter correct authorId and publisherId.")
        }
        else if(authorId.length === 0)
        {
            res.send("ERROR: Enter correct authorId.")
        }
        else if(publisherId.length === 0)
        {
            res.send("ERROR: Enter correct publisherId.")
        }
        else
        {
            let bookCreated = await bookModel.create(book)
            res.send({data: bookCreated})
            // res.send("done")
        }

    }
}
   

const getAllBooks= async function (req, res) {
    let books = await bookModel.find().populate(['author','publisher'])
    res.send({data: books})
}


const bookOper = async function(req, res)
{
    const publisherId = await publisherModel.find({$or: 
        [{name:"Penguin"},{name:"HarperCollins"}]
    }).select({_id:1})

    const hardCoverUpdate = await bookModel.updateMany(
        {
            publisher:publisherId
        },
        {
            $set:{isHardCover: true}
        },
        {
            new: true, upsurt: true
        }
    )
    const authors  = await authorModel.find({rating:{$gt:3.5}}).select({_id:1})

    const updateBookPrice = await bookModel.updateMany(
        {
            author:authors
        },
        {
            $inc:{price:10}
        },
        {
            new:true
        }
    )
    res.send(updateBookPrice)


}

module.exports.createBook= createBook
module.exports.getAllBooks= getAllBooks
module.exports.bookOper = bookOper