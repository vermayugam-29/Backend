const Todo = require('../models/Todo');

const deleteTodo = async(req , res) => {
    try {
        const {id} = req.params;
        const todo = await Todo.findByIdAndDelete({ _id : id });

        if(!todo){
            res.status(404).json({
                message : "Either the user has already been deleted or there is no suchh user"
            });
        }

        res.status(200).json({
            success : true,
            data : todo ,
            message : `Todo ${id} data deleted updated`
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

module.exports = { deleteTodo };