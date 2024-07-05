const mongoose = require('mongoose');
require('dotenv').config();

exports.dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL , {
        useNewurlParser : true ,
        useUnifiedTopology : true
    })
    .then(() => {
        console.log("Connected to Database Successfully");
    })
    .catch((err) => {
        console.error(err.messsage);
        console.log("Error while connecting to database");
        process.exit(1);
    })
}