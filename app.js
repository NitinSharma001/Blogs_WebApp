const express = require('express');
const app = express();
const path = require('path');
const Todo = require('./routes/models/todoModel')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mongoose = require('mongoose')
var cors = require('cors')
require("dotenv").config();

app.use(express.json());
app.use(cors())
app.post('/add-todo', async (req, res) => {
  try {
    const { content } = req.body;
    const data = await Todo.create({
      content
    })
    if (data) {
      res.status(200).send({
        message: "todo added successfully",
        data: data
      })
    } else {

      res.status(400).send({
        message: "bad request!",
      })
    }
  } catch (error) {
    res.json({
      "error": "Internl server error"
    })
  }
});

app.get('/all-todo', async (req, res) => {
  try {

    const data = await Todo.find()
    res.json({
      data
    })
  } catch (error) {
    res.json({
      "error": "Internal server error"
    })
  }
});



app.put('/edit-todo/:todoId', async (req, res) => {
  try {
    const todoId = req.params.todoId;
    console.log(todoId)
    const data = req.body;
    console.log(data)
    const filter = { _id: todoId }
    const edit_todo = await Todo.findOneAndUpdate(filter, data)
    console.log(edit_todo)
    res.json({ edit_todo })
  } catch (error) {
    res.json({ message: error })
  }

});
app.delete('/delete-docs', async (req, res) => {
  try {
    const delete_todo = await Todo.deleteMany()
    res.json({ delete_todo })
  } catch (error) {
    res.json({ message: error })
  }

});
// port setup
const PORT = process.env.PORT || 7000;
mongoose.connect(process.env.DB_CONNECTION, {
  useUnifiedTopology: true
})
  .then((data) =>
    app.listen(process.env.PORT, () => {
      console.log(`my server is started ${PORT}`);
    })
  )
  .catch((err) => console.log("error in db so server is closed", err));