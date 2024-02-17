module.exports.home = (req, res)=>{
    if(req.isAuthenticated()){
        return res.render('Student', {title: "student"});
    }
    return res.redirect('/user/sign-in')
};

module.exports.form = (req, res)=>{
    if(req.isAuthenticated()){
        return res.render('student_form', {title: "student form"});
    }
    return res.redirect('/user/sign-in')
}