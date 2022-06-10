const express = require('express');
const router = express.Router();
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")
const commonMW = require ("../middlewares/commonMiddlewares")

router.get("/test-me", commonMW.global, function (req, res) {
    res.send("My first ever api!")
})

router.get("/getAllBooks", commonMW.global,BookController.getBooksData)

module.exports = router;