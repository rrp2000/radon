const { request } = require("express")
const bookModel = require("../models/bookModel")
const authorModel = require("../models/authorModel")

const createBook = async function(req, res)
{
    let data= req.body
    let savedBook = await bookModel.create(data)
    res.send({msg: savedBook})
}

const bookWrittenBy = async function(req, res)
{
    let idOfChetan = await authorModel.find({author_name:"Chetan Bhagat"}).select({author_id:1})
    let bookByChetan =await bookModel.find({author_id:idOfChetan[0].author_id} )
    res.send({msg:bookByChetan})
}

const authorOf2States = async function(req, res)
{
    let book = await bookModel.findOneAndUpdate(
        {
            name: "Two states"
        },
        {
            $set:{price:100} 
        },
        {
            new:true
        }
    )
    let authorName = await authorModel.find({author_id:book.author_id}).select({author_name:1,_id:0})
    let price  = book.price;
    res.send({msg: authorName[0],price})
}

const costBetw = async function(req,res)
{
    let booksBetween = await bookModel.find({price:{$gte:50,$lte:100}}).select({author_id:1})
    // let arr = []
    // booksBetween.forEach(x => {
    //     arr.push(x.author_id)
    // })

    let allAuthor =[];
    for(let i =0;i<booksBetween.length;i++)
    {
        allAuthor.push(await authorModel.findOne({author_id:booksBetween[i].author_id}).select({author_name:1, _id:0})) 
    }
     
    
    res.send(allAuthor);
    
}


module.exports.createBook = createBook
module.exports.bookWrittenBy = bookWrittenBy
module.exports.authorOf2States = authorOf2States
module.exports.costBetw = costBetw