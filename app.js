const express = require ('express');
const path = require('path');
const hbs = require('hbs');
const exphbs = require('express-handlebars');
const routes = require('./server/routes/postRoutes.js');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');



const app = new express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));


//For the forms
app.use(cookieParser('CookingBlogSecure'));
app.use(session({
    secret : 'CookingBlogSecretSession', 
    saveUninitialized : true,
    resave : true
}));

app.use(flash());
app.use(fileUpload());

//To force the app to search files in public
app.use(express.static('public'));

// app.engine('hbs', exphbs.engine({
//     extname : 'hbs',
//     defaultView : 'main',
//     layoutsDir : path.join(__dirname, '/views/layouts'),
//     partialsDir : path.join(__dirname, 'views/partials')
// }));

//To set the view engine to hbs
app.set('view engine', 'hbs');


//To check if something being passed is not null
hbs.handlebars.registerHelper('isValid', function(value) {
    return value != '';
});

  
//Use the routes
app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, function ()
{
    console.log("Listening to port " + port);
});