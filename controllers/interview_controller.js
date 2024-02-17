const Interview = require("../models/interview");

module.exports.main = async (req, res)=>{
    try {
        if(req.isAuthenticated()){
            let interviews = await Interview.find({});
            return res.render('interviews', {
                title: "interviews",
                interviews: interviews
            })
        }
    } catch (error) {
        console.log(`Error in interview_Controller/main -> ${error}`);
        return res.redirect('back'); 
    }
}

module.exports.form = (req, res)=>{
    if(req.isAuthenticated()){
        return res.render('interview_form', {
            title: "form"
        })
    }
    return res.redirect('/user/sign-in');
}

module.exports.create = async(req,res)=>{
    try {
        let interview = await Interview.create(req.body);
        console.log("Interview created");
        return res.redirect('/interviews');
    } catch (error) {
        console.log(`Error in interview/create -> ${error}`);
        return res.redirect('back');
    }
}

module.exports.details = async(req, res)=>{
    try {
        let interview = await Interview.findOne({_id: req.params.id});
        if(interview){
            return res.render('interview_details', {
                title: "interview",
                interview: interview
            });
        }
        console.log("Interview not found");
        return res.redirect('back');
    } catch (error) {
        console.log(`Error in interview/details -> ${error}`);
        return res.redirect('back');
    }
}