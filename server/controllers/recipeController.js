//Require the schemas
require('../models/database');
const Recipe = require ('../models/Recipe');

const RecipeController = {

    //Homepage
    home: async (req, res) => {
        const max = 5;
        const recipes = await Recipe.find({}).limit(max);
        res.render('home', {recipes});
    },

    //Loading the Form
    submitRecipe : async (req, res) =>
    {
        res.render('submit-recipe');
    }, 

    //Saving the form to the Database
    submitRecipeDone : async (req, res) => {
        try 
        {
            // To accept IMAGE
            var uploadedImage;
            var uploadPath;
            var imageName;

            if(!req.files || Object.keys(req.files).length === 0){
                console.log('No image uploaded');
            }

            else
            {
                uploadedImage = req.files.image;
                //to have a unique filename
                imageName = Date.now() + uploadedImage.name;
                uploadPath = require('path').resolve('./') + '/public/uploads/' + imageName;

                uploadedImage.mv(uploadPath, function(err)
                {
                    if(err) return res.status(500).send(err);
                });
            }

            // Saving to DATABASE
            const newRecipe = new Recipe ({
                title : req.body.title,
                description : req.body.description,
                image : imageName,
                ingredients : req.body.ingredients, 
                preparation : req.body.preparation
            })

            //Test
            console.log('Title: ' + req.body.title);
            console.log('Description ' + req.body.description);
            console.log('Image ' + imageName);
            console.log('Ingredients: ' + req.body.ingredients);
            console.log('Preparation: ' + req.body.preparation);

            await newRecipe.save()

            console.log('Submitted');
            res.redirect('submit-recipe')
        } 
        catch (error) {
            console.log('Fail');
            res.redirect('submit-recipe');
        }
    },

    //To show post
    showRecipe : async (req, res) => 
    {
        try {
            //To extract the id from the request
            var recipeId = req.params.id;

            curId = recipeId;

            const recipe = await Recipe.findById(recipeId);

            res.render('recipe', {recipe});
        } catch (error) {

        }
    }, 

    //To show a random post
    showRandom : async (req, res) => 
    {
        try {

            //To find a random post
            var count = await Recipe.find().countDocuments();
            var random = Math.floor(Math.random() * count);
            var recipe = await Recipe.findOne().skip(random).exec();

            res.render ('random', {recipe});
        } catch (error) {
            
        }
    },

    //To search for a post based on title
    searchRecipe : async (req, res) =>
    {
        try {
            let searchTerm = req.body.searchTerm;
            
            // let recipes = await Recipe.find({ $text : { $search : searchTerm, $diacriticSensitive : true}});
            let recipes = await Recipe.find({ title: new RegExp(searchTerm, "i")})
            console.log(recipes)

            res.render('search', {recipes});

        } catch (error) {
            res.status(500).send({message: error.message || "Error Occured"});  
        }
    },

    updateRecipe : async  (req, res) => 
    {
        try {
            //To extract the id from the request
            var recipeId = req.params.id;
            const recipe = await Recipe.findById(recipeId);

            res.render('edit', {recipe});
        } catch (error) {

        }
    },

    updateRecipeDone : async (req, res) =>
    {
        //To get the ID
        const curid = req.params.id;

        const { title, description, image, ingredients, preparation } = req.body

        console.log('Title ' + req.body.title);

        //To save image
        var uploadedImage;
        var uploadPath;
        var imageName;

        if(!req.files || Object.keys(req.files).length === 0){
            console.log('No image uploaded');
        }

        else
        {
            uploadedImage = req.files.image;
            //to have a unique filename
            imageName = Date.now() + uploadedImage.name;
            uploadPath = require('path').resolve('./') + '/public/uploads/' + imageName;

            uploadedImage.mv(uploadPath, function(err)
            {
                if(err) return res.status(500).send(err);
            });
        }
    
        const updatedRecipe = {
            title: title,
            description: description,
            image: imageName,
            ingredients : ingredients,
            preparation : preparation
        }

        Recipe.findOneAndUpdate({_id: curid}, updatedRecipe, function(err, succ) 
        {
            if(err)
                console.log(err);
            else
                console.log('edited');
        })

        //to return to home after updating
        res.redirect('/');
    }, 

    deleteRecipe : async (req, res) => 
    {
        const curid = req.params.id;
        console.log(curid);

        Recipe.deleteOne({_id: req.params.id}, function(){
            //to return to home after deleting
            res.redirect('/');
            console.log('DELETED');
        })
    }
}   

module.exports = RecipeController;













