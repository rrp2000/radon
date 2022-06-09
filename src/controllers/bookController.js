const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel = require("../models/publisherModel")

const createBook= async function (req, res) {
    let book = req.body
    let authorId = await authorModel.find({_id:book.author})
    let publisherId = await publisherModel.find({_id:book.publisher})
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
        if(authorId.length === 0 && publisherId.length === 0)
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


// const bookOper = async function(req, res)
// {
//    let findBooks = await publisherModel.find({name:{$in:['Penguin','HarperCollins']}}).select({_id:1})
//    let books = await bookModel.find().populate('publisher')
//    let finalBooks;
//    for(let i = 0; i<books.length; i++)
//    {
//        for(let j = 0; j<findBooks; j++)
//        {
//            if(books[i].author._id == findBooks[j]._id)
//            {
//                finalBooks = await bookModel.findOneAndUpdate({
//                 "books[i].author._id" : "findBooks[j]._id"
//                },
//                {
//                    $set:{"books[i].isHardCover": true}
//                },
//                {
//                    new:true,upsert:true
//                }
//                )
//            }
//        }
//    }
//    res.send(finalBooks)
// }
module.exports.createBook= createBook
module.exports.getAllBooks= getAllBooks
// module.exports.bookOper = bookOper