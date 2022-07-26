
/** @jsx h */
import { h } from "preact";
import Router,{Link} from 'preact-router';
//import Counter from "/components/Counter.jsx"
import ELogin from "/components/auth/Login.jsx";
import ESignUp from "/components/auth/SignUp.jsx";
import ESignOut from "/components/auth/SignOut.jsx";
import Home from "/components/pages/Home.jsx";
import AuthProvider from "/components/auth/AuthProvider.jsx"
import AccessTopBar from "/components/AccessTopBar.jsx"

export default function App(){

  return (
    <AuthProvider>
      <AccessTopBar/>
      <Router>
        <Home path="/" />
        <ELogin path="/login" />
        <ESignUp path="/signup" />
        <ESignOut path="/signout" />
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