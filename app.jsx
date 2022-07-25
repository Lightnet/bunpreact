
/** @jsx h */
import { h } from "preact";
import Router,{Link} from 'preact-router';
//import Counter from "/components/Counter.jsx"
import ELogin from "/components/auth/Login.jsx";
import ESignUp from "/components/auth/SignUp.jsx";
import Home from "/components/pages/Home.jsx";
import AuthProvider from "/components/auth/AuthProvider.jsx"

export default function App(){

  return (
    <AuthProvider>
  
      <div>
        <Link href="/"> Home </Link><span> | </span>
        <Link href="/login">Login</Link><span> | </span>
        <Link href="/signup">Sign Up</Link>
      </div>
      <Router>
        <Home path="/" />
        <ELogin path="/login" />
        <ESignUp path="/signup" />
        <Home default />
      </Router>
  
    </AuthProvider>
  )
}

// <Counter />
//render(App(), document.body)
//let loading = document.getElementById("loading")
//if(loading){
  //loading.remove()
//}