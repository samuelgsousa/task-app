"use client"; // Para usar hooks como useEffect e useState
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Login from "./components/Login";

export default function Home() {

  return (
    <div>
      <Login></Login>

      <div className="aware">
        <h1>Usuário: <strong>Marcus</strong></h1>
        <h1>Senha: <strong>admin123</strong></h1>

        <p>Obs: A fim de tornar a experiência mais completa e funcional, adicionei um sistema de autenticação e um banco de dados remoto. Assim os dados ficam armazenados e é possível acessar a mesma lista de tarefas em qualquer dispositivo</p>
      </div>
    </div>
    
  );
}
