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
            return res.status(500).send("There was a problem finding the driver.");
        }
        res.status(200).send(user);
    });
});

//POST:create user
router.post('/', function (req,res){
    User.create({
            name: req.body.name,
            rating: req.body.rating,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            available: req.body.available
        },
        function (err, user) {
            if (err) {
                return res.status(500).send("There was a problem adding the information to the database.");
            }
            res.status(200).send(user);
        });
});

//PUT: update user info
router.put('/:id', function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the driver.");
        res.status(200).send(user);
    });
});
//DELETE: delete a user
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: "+ user.name +" was deleted.");
    });
});
module.exports = router;
