const Todo = require('../models/Todo');

const updateTodo = async(req , res) => {
    try {
        const {id} = req.params;
        const {title , description} = req.body;

        const todo = await Todo.findByIdAndUpdate(
            { _id : id },
            { title , description , updatedAt : Date.now()}
        );

        res.status(200).json({
            success : true,
            data : todo ,
            message : `Todo ${id} data successfully updated`
        })
    } catch (error) {
        res.status(500).json(
            {
                success : false ,
                data : "Internal server error",
                message : err.message
            }
        )
    }
}

module.exports = { updateTodo };