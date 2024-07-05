const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4000;

const dbConnect = require('./config/database');
dbConnect();
//middleware
app.use(express.json());

const Blog = require('./routes/Blog');
app.use('/api' , Blog);

app.listen(PORT , () => {
    console.log(`Successfully started at port ${PORT}`);
})

app.get('/' , (req,res) => {
    res.send(`<h1>This is home page</h1>`)
})