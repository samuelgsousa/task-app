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

// Rota para deletar uma tarefa pelo _id
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params; // Obtém o _id dos parâmetros da URL

  try {
    // Deleta a tarefa pelo _id
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    res.json({ message: 'Tarefa deletada com sucesso', task: deletedTask });
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    res.status(500).json({ message: 'Erro ao deletar a tarefa' });
  }
});

const userCredentials = {
  username: 'admin',
  password: '123456'
};

// Rota de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === userCredentials.username && password === userCredentials.password) {
    res.status(200).json({ message: 'Login bem-sucedido' });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
