var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

var Admin = require('./admin');

//GET: get a admin from database
router.get('/:id', function (req, res) {
    Admin.findById(req.params.id, function (err, admin) {
        if (err) return res.status(500).send("There was a problem finding the admin.");
        if (!admin) return res.status(404).send("No admin found.");
        res.status(200).send(admin);
    });
});

//GET: get all admins from the database
router.get('/', function (req, res) {
    Admin.find({}, function (err, admin) {
        if (err) {
            return res.status(500).send("There was a problem finding the admin.");
        }
        res.status(200).send(admin);
    });
});

//POST:create admin
router.post('/', function (req,res){
    Admin.create(req.body).then(function (admin){
        res.status(200).send(admin)
    });
});

//DELETE: delete a admin
router.delete('/:id', function (req, res) {
    Admin.findByIdAndRemove(req.params.id, function (err, admin) {
        if (err) return res.status(500).send("There was a problem deleting the admin.");
        res.status(200).send("admin: "+ admin.name +" was deleted.");
    });
});

module.exports = router;
