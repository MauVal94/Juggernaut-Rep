var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

var User = require('./user');

//GET: get a user from database
router.get('/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

//GET: get all users from the database
router.get('/', function (req, res) {
    User.find({}, function (err, user) {
        if (err) {
            return res.status(500).send("There was a problem finding the user.");
        }
        res.status(200).send(user);
    });
});

//POST:create user
router.post('/', function (req,res){
    User.create(req.body).then(function (user){
        res.status(200).send(user)
    });
});

//PUT: update user info
//DELETE: delete a user
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: "+ user.name +" was deleted.");
    });
});
module.exports = router;
