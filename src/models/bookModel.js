const mongoose = require("mongoose")

const bookSchema =  new mongoose.Schema({
    bookName:{
        type:String,
        required:true
    },
    price:{
        indPrice: Number,
        euroPrice: Number
    },
    year:{
        type:Number,
        default:2021
    },
    tags: [String],
    aurhorName: String,
    totalPages: Number,
    stockAvailbabe: Boolean
    },
    {timestamps: true})

module.exports = mongoose.model('Book', bookSchema);
