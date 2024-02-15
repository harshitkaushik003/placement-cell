const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({usernameField: 'email'}, async function(email, password, done){
    try {
        let user = await User.findOne({email: email});
        if(!user || user.password != password){
            console.log("Invalid username or password");
            return done(null, false);
        }
        return done(null, user);
    } catch (error) {
        console.log(`Error in passport -> ${error}`);
        return done(error);
    }
}));

passport.serializeUser((user, done)=>{
    return done(null, user.id);
})

passport.deserializeUser(async (id, done)=>{
    try {
        let user = await User.findById(id);
        if(user){
            return done(null, user);
        }
    } catch (error) {
        console.log("Error in deserializing -> " + error);
        return done(error);
    }
})

passport.checkAuthentication = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/user/sign-in');
}

passport.setAuthenticatedUser = (req, res, next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}
