"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './Todo.scss';
import './Login.scss'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('https://task-app-v262.onrender.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (res.status === 200) {
      const wmsg = document.querySelector('h2.wellcomeMessage');
      if (wmsg) {
        wmsg.style.display = 'block';
      }
      localStorage.setItem('authToken', 'loggedIn');
      router.push('/tasks'); // Redireciona para o componente de tarefas
    } else {
      setError('Credenciais inválidas');
    }
  };

  return (
    <div className="insertData">
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
