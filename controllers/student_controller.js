const Student = require("../models/student");
const Result = require("../models/result");

//rendering main student page
module.exports.home = async (req, res)=>{
    if(req.isAuthenticated()){
        try {
            let students = await Student.find({});
            return res.render('Student', {title: "student", students: students});
        } catch (error) {
            console.log(`Error in fetching students -> ${error}`);
        }
    }
    return res.redirect('/user/sign-in')
};

// rendering form for adding a student data 
module.exports.form = (req, res)=>{
    if(req.isAuthenticated()){
        return res.render('student_form', {title: "student form"});
    }
    return res.redirect('/user/sign-in')
}

// creating a new student 
module.exports.create = async (req, res)=>{
    try {
        // these values comes from the form 
        let student = await Student.create({
            name: req.body.name,
            batch: req.body.batch,
            details: {
                college: req.body.college,
                status: req.body.status,
            },
            scores: {
                dsa: req.body.dsa,
                dev: req.body.dev,
                react: req.body.react
            }
        });
        // printing a success message 
        console.log(`Student created --> ${student}`);
        return res.redirect('/students');


    } catch (error) {
        console.log(`error in creating student --> ${error}`);
    }
}

module.exports.profile = async function(req, res){
    if(req.isAuthenticated()){
       try {
            // fetching resukts and student details 
            let results = await Result.find({student: req.params.id}).populate('interview');
            let student = await Student.findOne({_id: req.params.id});
            
            if(student){
                return res.render('student_profile', {
                    title: "student profile",
                    student: student,
                    results: results
                }) 
            }else{
            console.log(`Student does not exist`);
            return res.redirect('/students');
            }
        } catch (error) {
            console.log(`Error in student_controller/profile --> ${error}`);
        }
    }else{
        return res.redirect('/user/sign-in');
    }
}

