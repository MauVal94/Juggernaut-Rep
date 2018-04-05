var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

var Driver = require('./driver');

//create a new driver
router.post('/', function (req,res){
    Driver.create({
            name: req.body.name,
            rating: req.body.rating,
            location: req.body.location

        },
        function (err, driver){
            if(err){
                return res.status(500).send("There was a problem adding the information to the database.");
            }
            res.status(200).send(driver);
        });
});
//get driver from database
router.get('/:id', function (req, res) {
    Driver.findById(req.params.id, function (err, driver) {
        if (err) return res.status(500).send("There was a problem finding the driver.");
        if (!driver) return res.status(404).send("No driver found.");
        res.status(200).send(driver);
    });
});

//  DELETES A DRIVER FROM THE DATABASE
 router.delete('/:id', function (req, res) {
     Book.findByIdAndRemove(req.params.id, function (err, driver) {
         if (err) return res.status(500).send("There was a problem deleting the driver.");
         res.status(200).send("Book: "+ driver.name +" was deleted.");
     });
 });

module.exports = router;