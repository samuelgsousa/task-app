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

// Outras rotas (atualizar, deletar) podem ser adicionadas aqui...

module.exports = router;
