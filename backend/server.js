const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const url = "mongodb+srv://samuel:S9isVL5cZgOKaErl@cluster0.ppobr.mongodb.net/tasklist"
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro de conexão:', err));

// Modelo de Tarefa
const TaskSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});

const Task = mongoose.model('Task', TaskSchema);

// Rota para obter tarefas
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Rota para adicionar tarefa
app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
