// routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Rota para criar uma nova tarefa
router.post('/', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).send(task);
});

// Rota para obter todas as tarefas
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

// Rota para deletar uma tarefa
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ id: req.params.id });
    if (task) {
      res.status(200).json({ message: 'Tarefa deletada com sucesso' });
    } else {
      res.status(404).json({ message: 'Tarefa não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar a tarefa' });
  }
});



// Outras rotas (atualizar, deletar) podem ser adicionadas aqui...

module.exports = router;
