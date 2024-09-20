const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  id: {type: Number, unique: true, required: true},
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

// Middleware para encontrar o maior id e incrementar
TaskSchema.pre('save', async function(next) {
  if (this.isNew) {
    // Busca a tarefa com o maior 'id' existente
    const lastTask = await Task.findOne().sort({ id: -1 });
    
    // Incrementa o 'id' baseado no maior valor encontrado, ou usa 1 se não houver tarefas
    this.id = lastTask ? lastTask.id + 1 : 1;
  }
  next();
});


const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
