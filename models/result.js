const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    student: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    interview: {type: mongoose.Schema.Types.ObjectId, ref: 'Interview'},
    result: {type: String}
}, {timestamps: true});

const Result = mongoose.model("Result", resultSchema);
module.exports = Result;