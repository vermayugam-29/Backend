const express = require('express');
const dbConnect = require('./config/database');
const BlogRoutes = require('./routes/Blog');

const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 4000;

app.use(express.json()); //using json parser

app.use('/api' , BlogRoutes);

app.listen(PORT , () => {
    console.log(`Server started successfully at ${PORT}`);
});

dbConnect();

app.get('/' ,(req,res) => {
    res.send('<h1> This is home Page</h1>')
});