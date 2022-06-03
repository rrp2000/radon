const express = require('express');

const router = express.Router();
const app = express();


router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

//problem 1
router.get('/movies',function(req , res){
    let movies = ['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins']
    res.send(movies);
})

//problem 2 and 3
router.get('/movies/:indexNumber',function(req , res){
    let movies = ['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins']
    index = req.params.indexNumber;
    if(index<movies.length)
    {
        res.send(movies[index]);
    }
    else
    {
        res.send("Please enter a valid index.")
    }
    
})

// problem 4
router.get('/films',function(req , res){
    let films = [{
        'id': 1,
        'name': 'The Shining'},
        {
        'id': 2,
        'name': 'Incendies'},
        {
        'id': 3,
        'name': 'Rang de Basanti'},
        {
        'id': 4,
        'name': 'Finding Nemo'}
    ]
    
    res.send(films);

})

//problem 5
router.get('/films/:filmId',function(req , res){
    const films = [{
        'id': 1,
        'name': 'The Shining'},
        {
        'id': 2,
        'name': 'Incendies'},
        {
        'id': 3,
        'name': 'Rang de Basanti'},
        {
        'id': 4,
        'name': 'Finding Nemo'}
    ]

    const getId = req.params.filmId;
    if(getId<films.length+1)
    {
        res.send(films[getId-1])
    }
    else
    {
        res.send("No movie exists with the id "+getId)
    }

})

router.get("/sol1", function (req, res){
    let arr= [1,2,3,5,6,7]
    let missingNumber =0;
    let n = arr[arr.length-1];
    let totalSum = (n*(n+1))/2;
    let arrSum = 0;
    arr.forEach(x => {
        arrSum = arrSum + x;
    })
    missingNumber = totalSum - arrSum;
    res.send({"data": missingNumber})
}) 


router.get("/sol2", function (req, res){
    let arr= [33,34,35,37,38];
    let missingNumber =0;
    n = arr.length;
    firstNum = arr[0];
    lastNum = arr[arr.length-1];
    let totalSum = (n+1)*((firstNum+lastNum)/2);
    let arrSum = 0;
    arr.forEach(x => {
        arrSum = arrSum + x;
    })
    missingNumber = totalSum - arrSum;
    res.send({"data": missingNumber})
}) 






module.exports = router;
