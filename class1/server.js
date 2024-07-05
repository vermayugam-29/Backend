//Server Instanciate    
const express = require('express');
const app = express();

//used to parse req.body in express -> PUT or POST
const bodyParser = require('body-parser');

//specifically parses JSON data & add it to req.BODY object
app.use(bodyParser.json());

//active server on port
app.listen(3000 , () => {
    console.log('server started at port no: 3000');
});

//creating route
app.get('/' , (req , res) => { //Get  or read reques
    res.send("Hello there")
})

app.post('/api/cars' , (req,res) => {
    const {name , brand } = req.body;
    console.log(name);
    console.log(brand);
    res.send("Cars page")
})


const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/practiceDb' , {
    useNewurlParser : true,
    useUnifiedTopology : true
})
.then(() => {console.log("Connectd to MongoDb successfully");})
.catch((error) => {console.error("Can't connect to MongoDB");})