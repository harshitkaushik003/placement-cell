const User = require("../models/user");
//controllers for managing authentication
module.exports = {
    // profile page 
    profile: (req, res)=>{
        return res.render('profile', {
            title: "profile"
        })
    },
    //renderign sign in page
    signIn: (req, res)=>{
        if(req.isAuthenticated()){
            return res.redirect('/user/profile');
        }
        return res.render('signIn', {
            title: "sign-in"
        });
    },
    // rendering sign up page 
    signUp: (req, res)=>{
        if(req.isAuthenticated()){
            return res.redirect('/user/profile');
        }

        return res.render('signUp', {
            title: "sign-up"
        })
    },
    // registering a user 
    create: async (req, res)=>{
        console.log(req.body);
        try {
            if(req.body.password != req.body.confirmPassword){
                console.log("passwords donot match");
                return res.redirect('back');
            }
            let user = await User.findOne({email: req.body.email})
            if(!user){
                await User.create(req.body);
                console.log("user created");
            }else{
                console.log("user already exists");
            }
            return res.redirect('/user/sign-in');
        } catch (error) {
            console.log(`Error in creating user --> ${error}`);
            return res.redirect('back');
        }
    },
    // redirecting to homepage on successfull session creation
    createSession: (req, res)=>{
        return res.redirect('/');
    },
    // logging out 
    signOut: (req, res, next)=>{
        req.logout(function(err){
            if(err){
                return next(err);
            }
            res.redirect('/');
        })
    }
}