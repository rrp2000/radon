const { request } = require("express")
const bookModel = require("../models/bookModel")
const authorModel = require("../models/authorModel")

//problem 1
const createBook = async function(req, res)
{
    let data= req.body
    let savedBook = await bookModel.create(data)
    res.send({msg: savedBook})
}

//problem 2
const bookWrittenBy = async function(req, res)
{
    let idOfChetan = await authorModel.find({author_name:"Chetan Bhagat"}).select({author_id:1})
    let bookByChetan =await bookModel.find({author_id:idOfChetan[0].author_id} )
    res.send({msg:bookByChetan})
}

//problem 3
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

//problem 4
const costBetw = async function(req,res)
{
    let booksBetween = await bookModel.find({price:{$gte:50,$lte:100}}).select({author_id:1})

    let allAuthor =[];
    for(let i =0;i<booksBetween.length;i++)
    {
        allAuthor.push(await authorModel.findOne({author_id:booksBetween[i].author_id}).select({author_name:1, _id:0})) 
    }
     
    
    res.send(allAuthor);
    
}

//optional problem 1
const getAuthByAuthId = async function(req, res)
{
    let data =(req.params)
    let books = await bookModel.find(data).select({name:1,_id:0})
    res.send({msg:books})
}

//optional problem 2
const olderThan50 = async function(req,res)
{
    let authorId = await bookModel.find({$gt:{ratings:4}}).select({author_id:1,_id:0})
    let arr =[]
    for(let i = 0; i<authorId.length;i++)
    {
        arr.push(await authorModel.findOne({author_id:authorId[i].author_id,"authorId[i].age":{$eq:60}}))
    }
    // let names = []
    // for(let i = 0; i<arr.length;i++)
    // {
    //     // names.push(await authorModel.find({arr[i].age:60}))
    //     console.log(arr)
    // }
    // // let names = await arr.find({age:{$gt:50}}).select({name:1, age:1, _id:0})
    // console.log(names)
    res.send(arr)
}




module.exports.createBook = createBook
module.exports.bookWrittenBy = bookWrittenBy
module.exports.authorOf2States = authorOf2States
module.exports.costBetw = costBetw
module.exports.getAuthByAuthId = getAuthByAuthId
module.exports.olderThan50 = olderThan50