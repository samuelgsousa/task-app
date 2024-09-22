"use client"; 
import localFont from "next/font/local";
import "./globals.css";
import { useState, useEffect } from "react";

export default function RootLayout({ children, isPopupOpen, confirmDeletePopup }) {



  const blurClass = isPopupOpen || confirmDeletePopup ? 'blur' : '';

  const [date, setDate] = useState('');
  
  useEffect(() => {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setDate(today.toLocaleDateString(undefined, options));
  }, []);

  return (
    <html lang="en">
      <body>
        <header className={blurClass}>

        <div className="logoContainer">
          <img src="/Logomark.png" alt="logo" className="logo"/>
          <h1>FocalPoint</h1>
        </div>

       <h2 className="wellcomeMessage">Bem-vindo de volta, Marcus</h2>

        <div>
          <span>{date}</span>
        </div>
        </header>
        {children}
      </body>
    </html>
  );
}
