// server.js
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const app = express();

app.use(cors());              // cho phép React gọi API
app.use(express.json());      // đọc JSON từ body

app.get('/', (req, res) => {
    res.send('Api is running')
})


mongoose.connect('mongodb+srv://thanhlong2001:long0101@cluster0.a6u6nyf.mongodb.net/?appName=Cluster0')
.then(() => {
  console.log('Connected')
})

const Schema = mongoose.Schema;


const TodoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
  editing: Boolean,
});

const Todo = mongoose.model('Todo', TodoSchema);

app.get('/todos', async (req, res) => {
  const todos = await Todo.find()
  res.json(todos)
})

app.patch('/todos/:id', async (req, res) => {
  const { id } = req.params
  const updatedTodo = await Todo.findOneAndUpdate({ _id: id }, req.body, {new : true})
  res.json(updatedTodo)

})



app.post('/todos', async (req, res) => {
  const todo = new Todo(req.body)
  await todo.save()
  res.json(todo)
})

app.delete('/todos/:id', async(req, res) => {
   const { id } = req.params

  const todo = await Todo.findByIdAndDelete(id)

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' })
  }

  res.json(todo)
})

app.listen(5000, () =>
  console.log("Server chạy tại http://localhost:5000")
);
