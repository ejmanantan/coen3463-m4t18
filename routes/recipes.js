var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;

var Rec = require('../models/rec');

var date = new Date();
var getDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();

var mdbUrl = "mongodb://food:recipe@ds111589.mlab.com:11589/coen3463t18"

var addStatus;

router.use(function(req, res, next) {
  if (!req.user) {
    res.redirect('/auth/login')
  }
  next();
});

//GET List of recipes
router.get('/', function(req, res){
  Rec.find().sort({created: 'descending'}).exec(function(err, recipes){
    res.render('list-of-recipies', {
        title: 'List of Recipes',
        recipes: recipes,
        user: req.user
      });
  })
});

router.post('/', function(req, res){
  res.redirect('/recipes')
})

//GET New Rec Page
router.get('/add', function(req, res) {
  console.log();
  var data = {
    title: 'Add a Recipe',
    status: addStatus,
    user: req.user
  }
  res.render('add', data);
  addStatus = "";
});

//POST New Rec Details
router.post('/add', function(req, res){
  var dataToSave = {
    title: req.body.title,
    ingr: req.body.ingr,
    des: req.body.des,
    yt: req.body.yt,
    cd: req.body.cd,
    updated: req.body.ud
  };

  var data = new Rec(dataToSave);
  data.save(function(err, tutorial){
    if(err) {
      console.log('Saving Data Failed!');
      addStatus = 'Saving Data Failed!';
    }
    else {
      console.log('Saving Data Successful!');
      addStatus = 'Saving Data Success';
      res.redirect('/recipes/add');
    }
  });
});

router.get('/:recipeId', function(req, res) {
  var recipeId = req.params.recipeId;
  Rec.findById(recipeId, function(err, info){
    res.render('rec', {
        title: info.title,
        recipeInfo: info,
        user: req.user
      });
  });
});

router.get('/:recipeId/edit', function(req, res) {
  var recipeId = req.params.recipeId;

  Rec.findById(recipeId, function(err, info) {
    res.render('update_entry', {
        title: 'Update Rec',
        recipeInfo: info,
        user: req.user
    })
  })
});

router.post('/:recipeId', function(req, res){
  var recipeId = req.params.recipeId;

  var newData = {
    title: req.body.title,
    ingr: req.body.ingr,
    des: req.body.des,
    yt: req.body.yt,
    cd: req.body.cd,
    updated: req.body.ud
  }

  Rec.update({_id: recipeId}, {$set: newData}, function(err, result){
    if(err) {
      console.log("Item not updated!");
    }
    else {
      console.log("Item Updated!")
      res.redirect('/recipes/' + recipeId)
    }
  });
});

router.get('/:recipeId/delete', function(req, res){
  var recipeId = req.params.recipeId;
  Rec.findByIdAndRemove(recipeId).exec();
  res.redirect('/recipes')
})

module.exports = router;