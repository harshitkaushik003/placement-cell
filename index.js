//requiring the modules
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const PassportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);


//setting the port
const port = 3000;

//setting up the app
const app = express();

//database
const db = require('./config/mongoose');

//url encoded
app.use(express.urlencoded());

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

//set up session cookie
app.use(session({
    name: 'placement',
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*60)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    }, function(error){
        console.log("error in mongo store");
    })
}));

//passport initialization and session creation
app.use(passport.initialize());
app.use(passport.session());

//setting authenticated user
app.use(passport.setAuthenticatedUser)


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
