var mongoose = require('mongoose');
var Schema = mongoose.Schema;
passportLocalMongoose = require('passport-local-mongoose');

var recipesSchema = new Schema({
  // id is created automatically
  name: {
        type: String
        //required: [true, 'What is the Recipe Name?']
  },
  ingr: {
        type: String
       // required: [true, 'What are the Ingredients?']
  },
  des: String,
  yt: String,
  cd: String,
  ud: String,
    },
    {
collection: 'recipes'

});

module.exports = mongoose.model('Recipe', recipesSchema);