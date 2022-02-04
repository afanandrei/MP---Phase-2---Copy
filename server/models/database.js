const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/flavors101DB');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected');
})

//Require the models
require('./Recipe');