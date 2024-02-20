const mongoose = require('mongoose');

//establishing a connection
mongoose.connect('mongodb://localhost/placement_cell_db');

// creating instace for the connection 
const db = mongoose.connection;

// error message 
db.on('error', console.error.bind(console, "error in connecting to database"));
// success message upon connection 
db.once('open', ()=>{
    console.log("Successfully connected to database");
})

module.exports = db;