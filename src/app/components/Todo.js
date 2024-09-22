"use client"; 
import React, { useState, useEffect, useRef  } from 'react';
import { useRouter } from 'next/navigation';
import './Todo.scss';

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [confirmDeletePopup, setConfirmDeletePopup] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const baseurl = 'https://task-app-v262.onrender.com/tasks'
   //const baseurl = 'http://localhost:5000/tasks'

   const router = useRouter();

   useEffect(() => {
    // Verificar se existe o token de autenticação
    const isAuthenticated = localStorage.getItem('authToken');

    if (!isAuthenticated) {
      window.alert('Você precisa realizar o login para acessar sua lista de tarefas')
      router.push('/');
    }
  }, [router]);

  // Função para buscar tarefas do backend
  const fetchTasks = async () => {
    const response = await fetch(baseurl);
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks(); // Busca tarefas ao montar o componente
  }, []);

  

  const addTask = async () => {
    if (newTask.trim()) {
      const response = await fetch(baseurl, {
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
    await fetch(`${baseurl}/${taskToDelete}`, {
      method: 'DELETE',
    });
    setTasks(tasks.filter(task => task._id !== taskToDelete));
    setConfirmDeletePopup(false);
    setTaskToDelete(null);
  };

  const toggleCompleted = async (id) => {
    const taskToUpdate = tasks.find(task => task._id === id);
    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

    await fetch(`${baseurl}/${id}`, {
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });

    setTasks(tasks.map(task => 
      task._id === id ? updatedTask : task
    ));
  };

  const wmsgRef = useRef(null);

  useEffect(() => {
    if (wmsgRef.current) {
      wmsgRef.current.style.display = 'block';
    }
  }, []);


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
            placeholder="Digite" 
            id="nTaskInput"
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
    <p>Uffa! Você não possui tarefas pendentes :)</p>
  ) : (
    // Renderiza apenas tarefas não completadas
    tasks
      .filter(task => !task.completed) // Filtra tarefas pendentes
      .map(task => (
        <li key={task._id}>
          <div className="item">
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompleted(task._id)}
              />
              <span className="checkmark"></span>
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
              </span>
            </label>
          </div>
          <button onClick={() => confirmDeleteTask(task._id)} className="excludeButton">
            <img src="/delete-icon.svg" alt="Excluir tarefa" className="trashIcon" />
          </button>
        </li>
      ))
  )}

{tasks.some(task => task.completed) && (
  <>
    <h1>Tarefas finalizadas</h1>

      {tasks
        .filter(task => task.completed) // Filtra tarefas completadas
        .map(task => (
          <li key={task._id} className="checkedTasks">
            <div className="item">
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompleted(task._id)}
                />
                <span className="checkmark"></span>
                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                  {task.text}
                </span>
              </label>
            </div>
            <button onClick={() => confirmDeleteTask(task._id)} className="excludeButton">
              <img src="/delete-icon.svg" alt="Excluir tarefa" className="trashIcon" />
            </button>
          </li>
        ))}

  </>
)}

</ul>

        <button onClick={() => setIsPopupOpen(true)} className="addTaskBtn">Adicionar Tarefa</button>
      </div>
    </div>
  );
};

export default Todo;
