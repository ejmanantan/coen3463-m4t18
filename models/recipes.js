var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
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
  notes: [{
    postedDate: {
      type: Date,
      'default': Date.now
    },
    note: String
  }]
});

module.exports = mongoose.model('Recipe', contactSchema);