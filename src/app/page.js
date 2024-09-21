import Image from "next/image";
import styles from "./page.module.css";
import Todo from "./components/Todo";

export default function Home() {
  return (
    
    <div className="App">    
    <header>
      <img src="/Logomark.png" alt="logo" class="logo"/>
      <h1>FocalPoint</h1>
    </header>

    <Todo/>
  
  </div>
  );
}
