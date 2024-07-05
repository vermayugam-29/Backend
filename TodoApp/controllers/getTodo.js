//import the model
const Todo = require("../models/Todo");

const getTodo = async (req, res) => {
    try {
        //fetch all to do items from database
        const todos = await Todo.find({});//will find all the todos when parameter is not given
        res.status(200).json(
            {
                success: true,
                data: todos,
                message: "Data Fetched Successfully",
            }
        );
    } 
    catch (err) {
        res.status(500).json(
            {
                success: false,
                error: err.message,
                message: 'Internal Server error',
            }
        )
    }
}


const getTodoById = async(req , res) => {
    try {
        const id = req.params.id;
        const todo = await Todo.findById({_id : id});

        if(!todo){
            return res.status(404).json(
                {
                    success : false ,
                    message : "No data found with given id"
                }
            )
        }
        res.status(200).json(
            {
                success : true , 
                data : todo ,
                message : "Data fetched successgully by id"
            }
        )
    } catch (err) {
        res.status(500).json(
            {
                success : false ,
                error : err.message ,
                message : "Internal server error"
            }
        )
    }
}

module.exports = { getTodo , getTodoById };