const express = require('express');
const router = express.Router();
const  User = require ('../models/user_model')

// Add new User 
router.post('/add', (req, res) => {
  let data = req.body;
  let userData = new User(data)
  userData.save((err, data) => {
    if (err) {
      res.status(400).send({"Success": false, "Message":"Failed to add the new user"});    
    } else {
      res.status(200).json({"Success": true});
    }
  });
});

//Retrieve all users
router.get('/', (req, res) => {
    var getUsers = User.find();
    var queryInput = req.query;

    // Else find the specific user 
    if (queryInput.searchKey) {
      getUsers.or([
        { 'FirstName': { $regex: queryInput.searchKey, $options: 'i' } },
        { 'LastName': { $regex: queryInput.searchKey, $options: 'i' } },
        { 'EmployeeID':  queryInput.searchKey }]);
    }

    if (queryInput.sortKey) {
      getUsers.sort([[queryInput.sortKey, 1]]);
    }
    getUsers.exec(function (err, users) {
      if (err) {
          res.json({ 'Success': false });
      }
      else {
          res.json({ 'Success': true, 'Data': users });;
      }
    });
});

//Retreive single user
router.get('/:id', (req, res) => {  
  let userId = req.params.id;
  User.findOne({ UserID: userId }, (err, userData) => {
      if (err) {
          res.json({ 'Success': false, 'Message': 'User not found' });
      }
      else {
          res.json({ 'Success': true, 'Data': userData });
      }
   });
});
  
// update user data
router.post('/edit/:id', (req, res) => {
let userId = req.params.id;
  User.findOne({ UserID: userId }, (err, user) => {
    if (!user)
        res.status(401).send({"Success": false, "Message":"Unable to find user"});
    else {
      user.FirstName = req.body.FirstName;
      user.LastName = req.body.LastName;
      user.EmployeeID = req.body.EmployeeID;

      user.save((err, UserData) => {
        if (err) {
          res.status(402).send({"Success": false, "Message":"Unable to update the user details"}); 
        } else {
          res.status(201).json({"Success": true});
        }
      });
    }
  });  
});

//delete the user
router.get('/delete/:id', (req, res) => {
  let userId = req.params.id;
  User.remove({ UserID: userId }, () => {
      res.json({ 'Success': true });
  });
});
  
module.exports = router;