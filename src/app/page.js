"use client"; // Para usar hooks como useEffect e useState
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = false; // Aqui você deve verificar se o usuário está autenticado

    if (!isAuthenticated) {
       // Redireciona para a página de login se não autenticado
    } else {
      router.push("/tasks"); // Ou redireciona para as tarefas se autenticado
    }
  }, [router]);

  return (
    <div>
      <h1>Bem-vindo ao FocalPoint</h1>
      <p>Redirecionando...</p>
    </div>
  );
}
