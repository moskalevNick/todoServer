const mongoose = require("mongoose")
const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const { Schema, model } = require("mongoose")
const { config } = require("dotenv")
config()

const PORT = process.env.BASE_PORT || 7000
const URL = process.env.BASE_URL

const schema = new Schema({
  todo: { type: String, required: true },
  important: { type: Boolean, required: true },
  checked: { type: Boolean, required: true },
})
const Todo = model("Todo", schema)

app.use(cors())
app.use(bodyParser.json())

app.get("/", async (req, res) => {
  const todos = await Todo.find({})
  res.json(todos)
})

app.put("/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id)
  if (req.body.type === "checked") {
    await Todo.findByIdAndUpdate(req.params.id, {
      $set: { checked: !todo.checked },
    })
  }
  if (req.body.type === "important") {
    await Todo.findByIdAndUpdate(req.params.id, {
      $set: { important: !todo.important },
    })
  }
  const todos = await Todo.find({})
  res.json(todos)
})

app.post("/", async (req, res) => {
  const newDB = new Todo(req.body)
  await newDB.save()
  const todos = await Todo.find({})
  res.json(todos)
})

app.delete("/:id", async (req, res) => {
  await Todo.findByIdAndRemove(req.params.id)
  const todos = await Todo.find({})
  res.json(todos)
})

app.delete("/", async (req, res) => {
  const allTodos = await Todo.find({})
  const checkedTodos = allTodos.filter((todo) => todo.checked === true)

  for (const todo of checkedTodos) {
    await Todo.findByIdAndRemove(todo._id)
  }

  const todos = await Todo.find({})
  res.json(todos)
})

app.listen(PORT, async () => {
  try {
    await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
    console.log(`server start at ${PORT}`)
  } catch (e) {
    console.log(e)
  }
})
