var express = require('express');
var router = express.Router();
var moment = require('moment');
var Recipe = require('../models/recipes');
var db;

router.use(function(req, res, next) {
  if (!req.user) {
    res.redirect('/auth/login')
  }
  next();
});

router.get('/', function(req, res) {
  Recipe.find( function(err, recipes, count) {
    res.render('recipes', {recipes: recipes});
  })
});

router.post('/', function(req, res) {
    new Recipe({
      name: req.body.name,
      ingr: req.body.ingr,
      des: req.body.des,
      yt: req.body.yt,
      cd: req.body.cd

    }).save(function(err, recipe, count) {
      if(err) {
        res.status(400).send('Error saving new contact: ' + err);
      } else {
        console.log("Saving Data Successfull!");
        res.redirect('/recipes');
      }
    })
});

router.get('/add', function(req, res) {
  res.render('add', {recipe: {}});
});

router.route('/:recipe_id')
  .all(function(req, res, next) {
    recipe_id = req.params.recipe_id;
    recipe = {};
    Recipe.findById(recipe_id, function(err, c) {
      recipe = c;
      next();
    });
  })

  .get(function(req, res) {
    res.render('edit', {recipe: recipe, moment: moment});
  })



  .post(function(req, res) {
      recipe.name= req.body.name,
      recipe.ingr= req.body.ingr,
      recipe.des= req.body.des,
      recipe.yt= req.body.yt,
      recipe.ud= req.body.ud
    recipe.save(function(err, recipe, count) {
      if(err) {
        res.status(400).send('Error saving contact: ' + err);
      } else {
        console.log("updated!");
        res.redirect('/recipes');
      }
    });
  })
/*
 router.delete( '/recipes', function(req, res) {
  var recipeId = req.params.recipeId;
    recipe.remove({ _id: recipeId },function(err, recipe) {
      if(err) {
        res.status(400).send("Error removing contact: " + err);
      } else {
            console.log("Deleting Data Successful!");
            res.redirect('/recipes/')
      }
    });
  });
*/
    /*router.get('/recipes/:recipeId/delete', function(req, res) {
        var recipeId = req.params.recipeId;
        var recipeCollection = db.collection('recipes');
        recipeCollection.deleteOne({ _id: new ObjectId(recipeId)}, function(err, food) {
            if(err){
            return console.log(err)
            }
            console.log("Deleting Data Successful!");
            res.redirect('/recipes/')
            
        });
    });

*/

module.exports = router;
