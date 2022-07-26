// browser client

/** @jsx h */
import { h } from "preact"
import { useState, useEffect } from "preact/hooks"
import Router from 'preact-router';
import AsyncRoute from 'preact-async-route';
import Loading from "./Loading.jsx"

import Home from "./pages/Home.jsx";
//import ELogin from "./auth/Login.jsx";
//import ESignUp from "./auth/SignUp.jsx";
//import ESignOut from "./auth/SignOut.jsx";
//import Settings from "./pages/Settings.jsx"

export default function PageRoutes(){

  async function loadModule(){
    const test = await import("./auth/SignUp.jsx").then(module => module.default)
    console.log(typeof test)
    console.log(test)
    
    return test;
  }

  useEffect(()=>{
    //loadModule();
  },[])
  
  //note that loading take a bit if hosting site dev build
  return (<Router>
    <Home path="/" />
    <AsyncRoute
      path="/login"
      getComponent={() => import("./auth/Login.jsx").then(module => module.default)}
      loading={()=>{return <Loading/>}}
    />
    <AsyncRoute
      path="/signup"
      getComponent={() => import("./auth/SignUp.jsx").then(module => module.default)}
      loading={()=>{return <Loading/>}}
    />
    <AsyncRoute
      path="/signout"
      getComponent={() => import("./auth/SignOut.jsx").then(module => module.default)}
      loading={()=>{return <Loading/>}}
    />
    <AsyncRoute
      path="/settings"
      getComponent={() => import("./pages/Settings.jsx").then(module => module.default)}
      loading={()=>{return <Loading/>}}
    />
    
    <Home default />
  </Router>)
}
/*

<ELogin path="/login" />
    <ESignUp path="/signup" />
    <ESignOut path="/signout" />
    <Settings path="/settings" />

 */