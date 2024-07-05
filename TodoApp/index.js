//Instanciating server using express
const express = require('express');
const app = express();

//jo bhi config env file me rakhi ha vo load ho jayegi "process" object ke andar
require('dotenv').config();
const PORT = process.env.PORT || 3000;

//middleware to parse JSON request body
app.use(express.json());

//import routes for TODO API
const todoRoutes = require('./routes/todo'); 

//mount the todo API routes
app.use('/api/v1' , todoRoutes);

//start the server
app.listen(PORT , () => {
    console.log(`Server started at port ${PORT}`);
});

//connecting DB
const dbConnect = require('./config/database');
dbConnect();

//default route
app.get('/' , (req , res) => {
    res.send(`<h1>This is home page</h1>`)
})