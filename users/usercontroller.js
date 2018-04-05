var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

var Driver = require('./driver');

//get driver from database
router.get('/:id', function (req, res) {
    Driver.findById(req.params.id, function (err, driver) {
        if (err) return res.status(500).send("There was a problem finding the driver.");
        if (!driver) return res.status(404).send("No driver found.");
        res.status(200).send(driver);
    });
});

module.exports = router;