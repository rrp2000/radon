
   
const express = require('express');
const router = express.Router();
const bookController = require("../controllers/BookController")
const authorController = require("../controllers/AuthorController")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createBook",bookController.createBook)
router.post("/createAuthor",authorController.createAuthor)

router.get("/booksByChetanBhagat",bookController.bookWrittenBy)
router.get("/authorOf2States",bookController.authorOf2States)
router.get("/costBet",bookController.costBetw)
module.exports = router;