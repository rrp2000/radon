const express = require('express');

const router = express.Router();
const app = express();


router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

//pritesh sir assignmnet 3/6/2022

let players =
   [
       {
           "name": "manish",
           "dob": "1/1/1995",
           "gender": "male",
           "city": "jalandhar",
           "sports": [
               "swimming"
           ]
       },
       {
           "name": "gopal",
           "dob": "1/09/1995",
           "gender": "male",
           "city": "delhi",
           "sports": [
               "soccer"
           ],
       },
       {
           "name": "lokesh",
           "dob": "1/1/1990",
           "gender": "male",
           "city": "mumbai",
           "sports": [
               "soccer"
           ],
       },
   ]

router.post('/players', function (req, res) {
 
    let newPlayer = req.body;
    let flag = true;
    players.forEach(x => {
        if(x.name === newPlayer.name)
        {
            flag = false;
        }
    })
    if(flag == true)
    {
        players.push(newPlayer);
        res.send(  { data: players , status: true }  )
    }
    else
    {
        res.send("A player already exists with this name. cant add.")
    }
    
})

module.exports = router;
