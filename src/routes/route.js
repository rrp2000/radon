const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const publisherController = require("../controllers/publisherController");
const bookModel = require('../models/bookModel');

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor",authorController.createAuthor)
router.get("/getAllAuthours",authorController.getAuthorsData)
router.post("/createPublisher",publisherController.createPublisher)
router.get("/getAllPublishers",publisherController.getAllPublisher)
router.post("/createBook",bookController.createBook)
router.get("/getAllBooks",bookController.getAllBooks)
router.put("/books",bookController.bookOper)

module.exports = router;