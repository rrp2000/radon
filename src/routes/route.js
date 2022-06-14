const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const authrorization = require("../middleware/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId",authrorization.authToken ,userController.getUserData)

router.put("/users/:userId",authrorization.authToken, userController.updateUser)

router.delete("/users/:userId", authrorization.authToken,userController.deleteUser)

module.exports = router;