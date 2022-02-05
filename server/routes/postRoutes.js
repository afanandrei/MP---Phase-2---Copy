const express = require('express');
const router = express.Router();

//Require the controller to use it
const recipeController = require('../controllers/recipeController');

//Route to homepage
router.get('/', recipeController.home);

//Submit forms
router.get('/submit-recipe', recipeController.submitRecipe);
router.post('/submit-recipe', recipeController.submitRecipeDone);

//To display info about recipe/post
router.get('/recipe/:id', recipeController.showRecipe);

//To display a random recipe/post
router.get('/random-recipe', recipeController.showRandom);

//To search for a recipe/post based on title
router.post('/search', recipeController.searchRecipe);

//To delete a recipe/post
router.post('/delete/:id', recipeController.deleteRecipe)


//To update a recipe/post
router.get('/update/:id', recipeController.updateRecipe)
router.post('/update/:id', recipeController.updateRecipeDone)

//To comment on a recipe
router.post('/comment/:id', recipeController.commentRecipe)

//To like a recipe
router.post('/like/:id', recipeController.likeRecipe)

module.exports = router;