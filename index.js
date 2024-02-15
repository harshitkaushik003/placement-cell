//requiring the modules
const express = require('express');
const expressLayouts = require('express-ejs-layouts');

//setting the port
const port = 3000;

//setting up the app
const app = express();

//setting up the view engine and views
app.set("view engine", "ejs");
app.set("views", "./views");

//use the layouts
app.use(expressLayouts);

//setup static files
app.use(express.static('./assets'));

//extract
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//setting up the routes
app.use('/', require('./routes'));

//fire up the server
app.listen(port, function(err){
    if(err){
        console.log(`Error -> ${err}`);
    }else{ 
        console.log(`Server is running on port -> ${port}`);
    }
});
