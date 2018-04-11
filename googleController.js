var express = require('express');
var router = express.Router();
var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCUzmUT7tJTRJtZ5KpL4Y4Mr6DmaPhSt6A',
    Promise: Promise
});

router.post('/driverDistance', function(req, res) {
    var location = req.body;
    var address = location.address;
    var city = location.city;
    var state = location.state;
    var fullAddress = `${address} ${city}, ${state}`;

    googleMapsClient.geocode({address: fullAddress})
        .asPromise()
        .then((response) => {
            var results = response.json.results;
            var result = results[0];
            var thisLocation = result.geometry.location;
            var thatLocation = {
                "lat": 40.478157,
                "lng": -88.95118699999999
            }
            googleMapsClient.distanceMatrix({
                origins: [ thisLocation ],
                destinations: [ thatLocation ]
            })
                .asPromise()
                .then(response => {
                    // console.log('response', response.json);
                    var duration = response.json.rows[0].elements[0].duration.text;
                    res.send(duration);
                })
                .catch(err => {
                    res.send('There was a problem with your function');
                    console.log(err);
                });
        })
        .catch((err) => {
            res.send('ERROR');
            console.log(err);
        });

});

module.exports = router;




