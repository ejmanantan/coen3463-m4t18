var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    nickname: {
        type: String,
       // required: [true, 'What is the Recipe Name?']
  },
    birthdate: Date
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);