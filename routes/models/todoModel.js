const mongoose = require('mongoose')
const todoSchema = new mongoose.Schema({
    content : {
        type : String,
    },
    tag : {
        type: String
    },
    completed:Boolean
})

module.exports = mongoose.model("Todo", todoSchema);