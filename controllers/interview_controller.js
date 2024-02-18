const Interview = require("../models/interview");
const Student = require('../models/student');
const Result = require('../models/result');
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
        if(req.isAuthenticated()){
            let students = await Student.find({});
            let interview = await Interview.findOne({ _id: req.params.id }).populate('students');
            let students2 = [];

            // Extract _id values from interview.students array
            let interviewStudentIds = interview.students.map(student => student._id.toString());

            // Filter students that are not in interview.students based on _id
            let restStudents = students.filter(student => !interviewStudentIds.includes(student._id.toString()));

            // Push the filtered students to students2
            students2.push(...restStudents);

            if(interview){
                return res.render('interview_details', {
                    title: "interview",
                    interview: interview,
                    students: students2
                });
            }
            console.log("Interview not found");
            return res.redirect('back');
        }else{
            return res.redirect('/user/sign-in');
        }
        
    } catch (error) {
        console.log(`Error in interview/details -> ${error}`);
        return res.redirect('back');
    }
}

module.exports.allocate = async(req,res)=>{
    try {
        let interview = await Interview.findOne({_id: req.params.id});
        if(!interview){
            console.log("interview not found");
            return res.redirect('back');
        }
        Object.keys(req.body).forEach(key => {
            if(key.startsWith('checkbox-')){
                console.log(key, req.body[key]);
                interview.students.push(req.body[key]);
                interview.save();
            }
        })

        return res.redirect('back');

    } catch (error) {
        console.log(`Error in interviews/allocate -> ${error}`);
        return res.redirect('back');
    }
}

module.exports.result = async(req, res)=>{
    try {
        if(req.isAuthenticated()){
            Object.keys(req.body).forEach(async key => {
                // console.log(key);
                let student=null, result='';
                if(key.startsWith('hidden-')){
                    student = req.body[key];
                    let resultKey = `radio-${student}`;
                    result = req.body[resultKey]
                }
                if(student && result){
                    console.log(student, result);
                    try {
                        let resultMain = await Result.create({
                            student: student,
                            interview: req.params.id,
                            result: result
                        });
                        console.log(resultMain.result);
                    } catch (error) {
                        console.log(`Error in creating result -> ${error}`);
                    }
                }
            })

            return res.redirect('back');
        }
    } catch (error) {
        console.log(`Error in interviews/result -> ${error}`);
        return res.redirect('back');
    }
}