// browser client

/** @jsx h */
import { h } from "preact";
import { 
  useEffect, 
  useState,
  useContext
} from "preact/hooks";

import { ThemeContext } from "./ThemeProvider.jsx";

export default function ToggleTheme(){
  
  const {theme, setTheme} = useContext(ThemeContext);

  useEffect(()=>{
    
  },[])

  function switchTheme(){
    console.log("switchTheme")
    if(!window.localStorage){
      return;
    }
    
    const currentTheme = document.documentElement.getAttribute("data-theme");
    let targetTheme = "light";
    if (currentTheme === "light") {
      targetTheme = "dark";
    }
    document.documentElement.setAttribute('data-theme', targetTheme);
    setTheme(targetTheme);
    localStorage.setItem('theme', targetTheme);
    
  }

  function toggleTheme(e){
    e.preventDefault();
    switchTheme();
  }

  return (
    <a href="#" onClick={toggleTheme}>Theme {theme}</a>
  )
}
