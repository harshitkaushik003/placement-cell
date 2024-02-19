const Result = require("../models/result");
const Student = require("../models/student");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const { result } = require("./interview_controller");

module.exports.downloadCsv = async (req, res)=>{
    let students = await Student.find({}).populate('interviews');
    let results = await Result.find({}).populate('interview');
    // console.log(results);
    const csvHeader = [
        {id: "id", title: "ID"},
        {id: "name", title: "Name"},
        {id: "college", title: "College"},
        {id: "status", title: "Status"},
        {id: "dsa", title: "DSA"},
        {id: "webd", title: "WEBD"},
        {id: "react", title: "React"},
        {id: "interviews", title: "Interviews"},
        {id: "results", title: "Results"}
    ]

    const data = [];

    students.forEach((student)=>{
        let interviews = [];
        let resultsFinal = []
        let studentResults = results.filter(result => result.student.toString() === student._id.toString());
        // console.log("s results", studentResults);
        studentResults.forEach(item=>{
            resultsFinal.push({
                company: item.interview.company,
                result: item.result
            })
        })
        console.log("result-> ", resultsFinal);
        student.interviews.forEach((item)=>{
            
            interviews.push({name: item.company, date: item.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })});
        })
        // console.log(interviews);

        data.push({
            id: student.id,
            name: student.name,
            college: student.details.college,
            status: student.details.status,
            dsa: student.scores.dsa,
            dev: student.scores.dev,
            react: student.scores.react,
            interviews: JSON.stringify(interviews),
            results: JSON.stringify(resultsFinal)

        })

    })
    const csvWriter = createCsvWriter({
        path: `students-details.csv`,
        header: csvHeader
    })

    csvWriter.writeRecords(data)
    .then(()=>{
        console.log("csv generated successfully");

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=output.csv');

        // Send the CSV file as the response
        res.sendFile(`students-details.csv`, { root: __dirname });

        return res.redirect('back');
    })
    .catch((err) => {
        console.error('Error writing CSV file:', err);
        res.status(500).send('Internal Server Error');
    });

}