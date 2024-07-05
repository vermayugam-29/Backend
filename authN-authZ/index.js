const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT;

//cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());

const {dbConnect} = require('./config/database');
dbConnect();

const user = require('./router/user');
app.use('/api/v1' , user);

app.listen(PORT , () => {
    console.log(`Successfully started at port ${PORT}`);
})