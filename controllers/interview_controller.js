//schemas
const Interview = require("../models/interview");
const Student = require('../models/student');
const Result = require('../models/result');

// controller that renders the interview page 
module.exports.main = async (req, res)=>{
    try {
        // checking if user exists 
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

// controller for the form page 
module.exports.form = (req, res)=>{
    if(req.isAuthenticated()){
        return res.render('interview_form', {
            title: "form"
        })
    }
    return res.redirect('/user/sign-in');
}

// controller for creating an interview 
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

//this controller is for the form details page
module.exports.details = async(req, res)=>{
    try {
        if(req.isAuthenticated()){
            // finding all the data from schemas 
            let students = await Student.find({});
            let interview = await Interview.findOne({ _id: req.params.id }).populate('students');
            let result = await Result.find({interview: req.params.id}).populate('student');
            let students2 = [], resStudents = [];

            // extracting _id values from interview.students array
            let interviewStudentIds = interview.students.map(student => student._id.toString());
            let resultIds = result.map(item => item.student._id.toString());

            // filtering students that are not in interview.students based on _id
            // the students who have already been allocated an interview should not be present under the allocation list 
            let restStudents = students.filter(student => !interviewStudentIds.includes(student._id.toString()) );

            // same filtering for results 
            // those students whose results are decided should not be under result list in frontend 
            let resStudentRest = interview.students.filter(student => !resultIds.includes(student._id.toString()));

            // pushing the filtered students to students2
            students2.push(...restStudents);
            resStudents.push(...resStudentRest);

            if(interview){
                return res.render('interview_details', {
                    title: "interview",
                    interview: interview,
                    students: students2,
                    result: result,
                    resultStudents: resStudents
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

// controller for allocation of interviews 
module.exports.allocate = async (req, res) => {
    try {
        let interview = await Interview.findOne({ _id: req.params.id });

        if (!interview) {
            console.log("Interview not found");
            return res.redirect('back');
        }

        // creating an array to store promises
        const savePromises = [];

        for (const key of Object.keys(req.body)) {
            if (key.startsWith('checkbox-')) {
                console.log(key, req.body[key]);
                let student = await Student.findOne({ _id: req.body[key] });
                student.interviews.push(req.params.id);
                interview.students.push(req.body[key]);

                // adding save promises to the array
                savePromises.push(student.save());
            }
        }

        // after all modifications, save the interview document once
        savePromises.push(interview.save());

        // waiting for all save operations to complete
        await Promise.all(savePromises);

        return res.redirect('back');
    } catch (error) {
        console.log(`Error in interviews/allocate -> ${error}`);
        return res.redirect('back');
    }
};

// controller for result 
module.exports.result = async(req, res)=>{
    try {
        if(req.isAuthenticated()){
            Object.keys(req.body).forEach(async key => {
                
                let student=null, result='';
                if(key.startsWith('hidden-')){
                    student = req.body[key];
                    let resultKey = `radio-${student}`;
                    result = req.body[resultKey]
                }
                // creating result based on the above data 
                if(student && result){
                    try {
                        let resultMain = await Result.create({
                            student: student,
                            interview: req.params.id,
                            result: result
                        });
                        
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