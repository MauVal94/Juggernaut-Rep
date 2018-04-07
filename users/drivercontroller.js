var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

var Driver = require('./driver');

//GET: get a driver from database
router.get('/:id', function (req, res) {
    Driver.findById(req.params.id, function (err, driver) {
        if (err) return res.status(500).send("There was a problem finding the driver.");
        if (!driver) return res.status(404).send("No driver found.");
        res.status(200).send(driver);
    });
});

//GET: get all drivers from the database
router.get('/', function (req, res) {
    Driver.find({}, function (err, driver) {
        if (err) {
            return res.status(500).send("There was a problem finding the driver.");
        }
        res.status(200).send(driver);
    });
});

//POST:create driver
router.post('/', function (req,res){
    Driver.create({
            name: req.body.name,
            rating: req.body.rating,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            available: req.body.available
        },
        function (err, driver) {
            if (err) {
                return res.status(500).send("There was a problem adding the information to the database.");
            }
            res.status(200).send(driver);
        });
});

//PUT: update driver info
router.put('/:id', function (req, res) {
    Driver.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, driver) {
        if (err) return res.status(500).send("There was a problem updating the driver.");
            res.status(200).send(driver);
    });
});
//DELETE: delete a driver
router.delete('/:id', function (req, res) {
    Driver.findByIdAndRemove(req.params.id, function (err, driver) {
        if (err) return res.status(500).send("There was a problem deleting the driver.");
        res.status(200).send("driver: "+ driver.name +" was deleted.");
    });
});

module.exports = router;
