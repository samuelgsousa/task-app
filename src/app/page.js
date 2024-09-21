"use client"; // Para usar hooks como useEffect e useState
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Login from "./components/Login";

export default function Home() {

  return (
    <Login></Login>
  );
}
