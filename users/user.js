var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    name: String,
    rating: String,
    longitude: String,
    latitude: String,
    available: Boolean
});
mongoose.model('user', UserSchema);
module.exports = mongoose.model('user');
