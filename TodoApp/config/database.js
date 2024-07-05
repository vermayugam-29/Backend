const mongoose = require('mongoose');

require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL , {
        useNewurlParser : true , 
        useUnifiedTopology : true,
    })
    .then(() => {console.log("Databse is Connected Successfully");})
    .catch((err) => {
        console.log("Something went wrong while connecting to MonogoDB");
        console.error(err.message);
        process.exit(1);
    })
}

module.exports = dbConnect;