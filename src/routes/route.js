

const express = require('express');
const router = express.Router();
const authorController= require("../controller/authorController")
const blogController= require("../controller/blogController")
const middleware= require("../middleware/auth")





router.post("/authors", authorController.createAuthor);

router.post("/login", authorController.loginAuthor);

router.post("/blogs", middleware.authenticate,blogController.createBlog);

router.get("/blogs", middleware.authenticate,blogController.getBlog);

router.put("/blogs/:blogId",middleware.authenticate, blogController.updateBlog);

router.delete("/blogs/:blogId",middleware.authenticate, blogController.deleteBlogById);

router.delete('/blogs',middleware.authenticate, blogController.deleteByQuery );





router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        msg: "The api you request is not available"
    })
})







module.exports = router;


