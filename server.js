const express = require('express'); //to create REST app
const app = express(); //rest obj
require('dotenv').config() //for hiding  sensitive info in .env file
const dbconfig = require("./config/dbconfig"); //connecting to the database using config file

const moragan = require('morgan');  //route endpoint & time to exe
const colors = require('colors');

const cors = require('cors');
app.use(express.json());   // used to restructure

const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');
const doctorRoute = require('./routes/doctorRoute');

app.use(cors()); // Enable CORS

app.use('/api/user', userRoute);
app.use('/api/admin',adminRoute);
app.use('/api/doctor',doctorRoute);


// app.get("/api/user", (req, res) => {
// res.json("HOME PAGE");
// }) ;
// app.get("/", (req, res) => {
//     res.send("Welcome to the API!"); // Or any other response you want to send for the root URL
//   });



//port
const port = process.env.PORT || 7777; //3000 already in use by client

app.listen(port, () => console.log("Node server started on port".bgGreen.gray , port));