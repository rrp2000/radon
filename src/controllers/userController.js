const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
  //You can name the req, res objects anything.
  //but the first parameter is always the request 
  //the second parameter is always the response
    try{
      let data = req.body;
      if(Object.keys(data).length === 0){

        res.status(400).send({ERROR: "You don't have any credential to create the user."})
      }
      else{
        let savedData = await userModel.create(data);
        res.status(200).send({ msg: savedData });
      }
    }
    catch(err){
      res.status(500).send({ERROR: err.message})
    }
};

const loginUser = async function (req, res) {
  // Once the login is successful, create the jwt token with sign function
  // Sign function has 2 inputs:
  // Input 1 is the payload or the object containing data to be set in token
  // The decision about what data to put in token depends on the business requirement
  // Input 2 is the secret
  // The same secret will be used to decode tokens
  try{
    let body = req.body
    if(Object.keys(body).length===0) return res.status(400).send({ERROR: "Please enter username and password"})
    let userName = body.emailId;
    if(!userName) return res.status(400).send({ERROR: "Please enter the username"})
    let password = body.password;
    if(!password) return res.status(400).send({ERROR: "Please enter the password"})


    let user = await userModel.findOne({ emailId: userName, password: password });
    if (!user)
      return res.send({
        status: false,
        msg: "username or the password is not corerct",
      });
    
    let token = jwt.sign(
      {
        userId: user._id.toString(),
        batch: "radon",
        organisation: "FunctionUp",
      },
      "functionup-radon"
    );
    res.setHeader("x-auth-token", token);
    res.status(200).send({ status: true, token: token });
  }
  catch(error){
    res.status(500).send({ERROR: error.message})
  }
};

const getUserData = async function (req, res) {
try{

  let userId = req.params.userId;
  if(!userId) return res.status(400).send({ERROR: "Enter the user ID"})
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.status(404).send({ status: false, msg: "No such user exists" });

  res.status(200).send({ status: true, data: userDetails });
}
catch(err){
  res.status(500).send({ERROR: err.message})
}
  // If a token is present then decode the token with verify function
  // verify takes two inputs:
  // Input 1 is the token to be decoded
  // Input 2 is the same secret with which the token was generated
  // Check the value of the decoded token yourself

};

const updateUser = async function (req, res) {
// Do the same steps here:
// Check if the token is present
// Check if the token present is a valid token
// Return a different error message in both these cases
try{
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  //Return an error if no user with the given id exists in the db
  if (!user) {
    return res.status(404).send("No such user exists");
  }

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData,{new:true});
  res.status(200).send({ status: userData, data: updatedUser });
}
catch(err){
  res.status(500).send({ERROR: err.message})
}
}
  

const deleteUser = async function(req, res)
{
  try{
    const userId = req.params.userId
    if(!userId) return res.status(404).send({ERROR: "Enter the userID"})

    const userData = await userModel.findById(userId)
    if(!userData) return res.status(404).send({ERROR: "No such user exist, try again"})

    let deletedUser = await userModel.findOneAndUpdate({ _id: userId },{$set:{isDeleted: true}},{new: true});
    res.status(200).send({deletedData: deletedUser})
  }
  catch(err){
    res.status(500).send({ERROR: err.message})
  }
  

};

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
