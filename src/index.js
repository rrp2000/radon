const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const global = require("./middlewares/commonMiddlewares")
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://spacespider:admin@cluster0.0ps1ymn.mongodb.net/Rosan-middlewareAssignment-DB?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use( function (req, res, next) {
    const myIp = require("local-ip-address")
    const time = require("time-stamp")
    // const route = (_route)
    const currentTime = time('YYYY/MM/DD HH:mm:ss')
    console.log(myIp())
    console.log(currentTime)


    next();
})

// app.use(global)
app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});


