var mongoose = require('mongoose');
var DriverSchema = new mongoose.Schema({
    name: String,
    rating: String,
    location: String,
    available: Boolean
});
mongoose.model('driver', DriverSchema);
module.exports = mongoose.model('driver');