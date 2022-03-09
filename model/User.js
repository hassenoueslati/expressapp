var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User = new Schema({
    Login : String,
    Password : String
});

module.exports = mongoose.model('User', User);