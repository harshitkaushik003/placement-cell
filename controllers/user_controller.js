const User = require("../models/user");

module.exports = {
    profile: (req, res)=>{
        return res.render('profile', {
            title: "profile"
        })
    },
    signIn: (req, res)=>{
        if(req.isAuthenticated()){
            return res.redirect('/user/profile');
        }
        return res.render('signIn', {
            title: "sign-in"
        });
    },
    signUp: (req, res)=>{
        if(req.isAuthenticated()){
            return res.redirect('/user/profile');
        }

        return res.render('signUp', {
            title: "sign-up"
        })
    },
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
    createSession: (req, res)=>{
        return res.redirect('/');
    },
    signOut: (req, res, next)=>{
        req.logout(function(err){
            if(err){
                return next(err);
            }
            res.redirect('/');
        })
    }
}