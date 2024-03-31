const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)
//mongoose.connect('mongodb://username:password@host:port/databaseName', { useNewUrlParser: true, useUnifiedTopology: true });


const connection = mongoose.connection;
connection.on('connected', ()=>(
 console.log('mongoDB is connected'.bgYellow.gray, mongoose.connection.host)
));

connection.on('error', (error)=>(
    console.log('error in mongoDB connection' .bgYellow.gray , error)
   ));

module.exports = mongoose;