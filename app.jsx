
/** @jsx h */
import { h } from "preact";
import Router,{Link} from 'preact-router';
//import Counter from "/components/Counter.jsx"
import ELogin from "/components/auth/Login.jsx";
import ESignUp from "/components/auth/SignUp.jsx";
import Home from "/components/pages/Home.jsx";

export default function App(){

  return (
  <div>
    <div>
    <Link href="/"> Home </Link><span> | </span>
    <Link href="/login">Login</Link><span> | </span>
    <Link href="/signup">Sign Up</Link>
    </div>
    <Router>
      <Home path="/" />
      <ELogin path="/login" />
      <ESignUp path="/signup" />

      <ELogin default />
    </Router>
    
  </div>
  )
}
// <Counter />
//render(App(), document.body)
//console.log("Hello JSX")

//let loading = document.getElementById("loading")
//if(loading){
  //loading.remove()
//}