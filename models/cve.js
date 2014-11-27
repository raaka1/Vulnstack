var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var cveid = new Schema({
    name: String,
    sname: String
});

cveid.plugin(passportLocalMongoose);

module.exports = mongoose.model('Bugdetail', cveid)