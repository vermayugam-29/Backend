const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL , {
        useNewurlParser : true,
        useUnifiedTopology : true
    })
    .then( () => {
        console.log("Connected to databse successfully");
    })
    .catch( (err) => {
        console.error(err.message);
        console.log("Error connecting to Databse");
        process.exit(1);
    })
}

module.exports = dbConnect;