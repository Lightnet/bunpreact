
/** @jsx h */
import { h } from "preact";
//import Router from 'preact-router';
//import Counter from "/components/Counter.jsx"
import AuthProvider from "/components/auth/AuthProvider.jsx"
import AccessTopBar from "/components/AccessTopBar.jsx"
import PageRoutes from "/components/PageRoutes.jsx"
import ThemeProvider from "/components/theme/ThemeProvider.jsx"

export default function App(){

  return (<ThemeProvider>
    <AuthProvider>
      <AccessTopBar/>
      <PageRoutes/>
    </AuthProvider>
  </ThemeProvider>)
  
}

// <Counter />
//render(App(), document.body)
//let loading = document.getElementById("loading")
//if(loading){
  //loading.remove()
//}