"use client"; 
import React, { useState, useEffect } from 'react';
import './Todo.scss';

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [confirmDeletePopup, setConfirmDeletePopup] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  
  
  // Função para buscar tarefas do backend
  const fetchTasks = async () => {
    try {
      const response = await fetch('https://task-app-v262.onrender.com/tasks');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      // Você pode também definir um estado para mostrar uma mensagem de erro se necessário
    }
  };
  
  useEffect(() => {
    fetchTasks();
  }, []);
  

  const addTask = async () => {
    if (newTask.trim()) {
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newTask, completed: false }),
      });
      const addedTask = await response.json();
      setTasks([...tasks, addedTask]);
      setNewTask('');
      setIsPopupOpen(false); 
    }
  };

  const confirmDeleteTask = (id) => {
    setTaskToDelete(id);
    setConfirmDeletePopup(true);
  };

  const deleteTask = async () => {
    await fetch(`http://localhost:5000/tasks/${taskToDelete}`, {
      method: 'DELETE',
    });
    setTasks(tasks.filter(task => task.id !== taskToDelete));
    setConfirmDeletePopup(false);
    setTaskToDelete(null);
  };

  const toggleCompleted = async (id) => {
    const taskToUpdate = tasks.find(task => task.id === id);
    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT', // Certifique-se de ter uma rota PUT no backend para atualizar a tarefa
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });

    setTasks(tasks.map(task => 
      task.id === id ? updatedTask : task
    ));
  };

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
          {tasks.filter(task => !task.completed).length === 0 ? (
            <p>Você não possui tarefas pendentes.</p>
          ) : (
            tasks.map(task => (
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
        </ul>

        {tasks.some(task => task.completed) && (
          <>
            <h1>Tarefas finalizadas</h1>
            <ul className="taskList">
              {tasks.filter(task => task.completed).map(task => (
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
              ))}
            </ul>
          </>
        )}

        <button onClick={() => setIsPopupOpen(true)}>Adicionar Tarefa</button>
      </div>
    </div>
  );
};

export default Todo;
