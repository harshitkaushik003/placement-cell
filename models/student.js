const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    batch: {type: String, required: true},
    details: {
        college: String,
        status: {type: String}
    },
    scores : {
        dsa: Number,
        dev: Number,
        react: Number
    },
    interviews : [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Interview'}
    ]
}, {timestamps: true});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;