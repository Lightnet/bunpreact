// browser client

/** @jsx h */
import { h, createContext } from "preact"
import { 
  useEffect, 
  useState, 
  useMemo 
} from "preact/hooks"

export const ThemeContext = createContext('light')

export default function ThemeProvider(props){
  const [theme, setTheme] = useState('light')

  useEffect(()=>{
    //console.log("localStorage",localStorage)
    checkThemeStroage();
  },[])

  function checkThemeStroage(){
    if(!window.localStorage){
      return;
    }
    const storedTheme = window.localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    console.log("storedTheme: ",storedTheme);
    if (storedTheme)
      document.documentElement.setAttribute('data-theme', storedTheme)
  }

  const value = useMemo(() => {
    return { theme, setTheme }
  }, [theme])

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  )
}
