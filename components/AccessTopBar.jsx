// browser client

/** @jsx h */
import { h, Fragment } from "preact"
import { useState, useEffect, useContext } from "preact/hooks"
import { Link } from 'preact-router';
import { AuthContext } from "./auth/AuthProvider.jsx"
import { isObjEmpty } from "../libs/helper.js"
import ToggleTheme from "/components/theme/ToggleTheme.jsx";

export default function AccessTopBar(){

  const [isLogin, setIsLogin] = useState(false);
  const { userInfo, setUserInfo } = useContext(AuthContext);

  //console.log(isObjEmpty({}))
  //console.log(isObjEmpty({test:"text"}))

  useEffect(()=>{
    if(isObjEmpty(userInfo)==false){
      setIsLogin(true)
    }else{
      setIsLogin(false)
    }
  },[userInfo])

  return (<div>
    <Link href="/">Home</Link><span> | </span>
    <Link href="/todolist">To Do List</Link><span> | </span>
    
    {isLogin==true ? (
      <Fragment>
        <Link href="/signout">Sign Out</Link><span> | </span>
      </Fragment>
    ):(
      <Fragment>
        <Link href="/login">Login</Link><span> | </span>
        <Link href="/signup">Sign Up</Link><span> | </span>
      </Fragment>
    )}
    <Link href="/settings">Settings</Link> <span> | </span>
    <ToggleTheme/> <span> | </span>
  </div>)
}
