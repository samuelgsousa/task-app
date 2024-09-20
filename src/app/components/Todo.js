"use client"; 
import React, { useState } from 'react';
import './Todo.scss'; // Verifique se o caminho está correto

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [confirmDeletePopup, setConfirmDeletePopup] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
      setIsPopupOpen(false); 
    }
  };

  const confirmDeleteTask = (id) => {
    setTaskToDelete(id);
    setConfirmDeletePopup(true);
  };

  const deleteTask = () => {
    setTasks(tasks.filter(task => task.id !== taskToDelete));
    setConfirmDeletePopup(false);
    setTaskToDelete(null);
  };

  const toggleCompleted = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Separar tarefas pendentes e finalizadas
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="allContent">
      {/* Pop-up nova tarefa */}
      {isPopupOpen && (
        <div className={`popup ${isPopupOpen ? 'active' : ''}`}>
          <h2>Nova Tarefa</h2>
          <span>Título</span>
          <input 
            type="text" 
            value={newTask} 
            onChange={(e) => setNewTask(e.target.value)} 
            placeholder="Digite a tarefa" 
            className="nTaskInput"
          />
          <div className="buttonsContainer">
            <button onClick={() => setIsPopupOpen(false)} className="cancelButton">Cancelar</button>
            <button onClick={addTask}>Adicionar</button>
          </div>
        </div>
      )}

      {/* Pop-up de confirmação para exclusão */}
      {confirmDeletePopup && (
        <div className={`popup ${confirmDeletePopup ? 'active' : ''}`}>
          <h2>Deletar tarefa</h2>
          <p>Tem certeza de que deseja deletar essa tarefa?</p>
          <div className="buttonsContainer">
            <button onClick={() => setConfirmDeletePopup(false)} className="cancelButton">Cancelar</button>
            <button onClick={deleteTask} className="deleteButton">Deletar</button>
          </div>
        </div>
      )}

      <div className={`todo-container ${isPopupOpen || confirmDeletePopup ? 'blur' : ''}`}>
        <ul className="taskList">
          <h1>Suas tarefas de Hoje</h1>
          
          {/* Exibir mensagem se não houver tarefas pendentes */}
          {pendingTasks.length === 0 ? (
            <p>Você não possui tarefas pendentes</p>
          ) : (
            pendingTasks.map(task => (
              <li key={task.id}>
                <div className="item">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleCompleted(task.id)}
                  />
                  <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                    {task.text}
                  </span>
                </div>
                <button onClick={() => confirmDeleteTask(task.id)} className="excludeButton">
                  <img src="/delete-icon.svg" alt="Excluir tarefa" className="trashIcon"/>
                </button>
              </li>
            ))
          )}

          {/* Exibir cabeçalho e tarefas finalizadas, se houver */}
          {completedTasks.length > 0 && (
            <>
              <h1>Tarefas finalizadas</h1>
              {completedTasks.map(task => (
                <li key={task.id}>
                  <div className="item">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleCompleted(task.id)}
                    />
                    <span style={{ textDecoration: 'line-through' }}>
                      {task.text}
                    </span>
                  </div>
                  <button onClick={() => confirmDeleteTask(task.id)} className="excludeButton">
                    <img src="/delete-icon.svg" alt="Excluir tarefa" className="trashIcon"/>
                  </button>
                </li>
              ))}
            </>
          )}
        </ul>
        <button onClick={() => setIsPopupOpen(true)}>Adicionar Tarefa</button>
      </div>
    </div>
  );
};

export default Todo;
