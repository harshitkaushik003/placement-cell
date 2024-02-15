const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/placement_cell_db');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "error in connecting to database"));
db.once('open', ()=>{
    console.log("Successfully connected to database");
})

module.exports = db;