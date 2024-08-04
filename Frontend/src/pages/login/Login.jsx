import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
const Login = () => {
  const [userName,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const {loading,login}=useLogin()
  const handleInputChange=async(e)=>{
    e.preventDefault()
    await login(userName,password)
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Login At <span className={styles.logo}>Chat-tu</span></h1>

      <form onSubmit={handleInputChange} className={styles.form}>
        <div className={styles.inputField}>
          <label className={styles.label}>Username:</label>
          <div className={styles.shadow}>
            <input type="text" placeholder="Enter username" value={userName} onChange={(e)=>{
              setUsername(e.target.value)
            }}/>
          </div>
        </div>

        <div className={styles.inputField}>
          <label className={styles.label}>Password:</label>
          <div className={styles.shadow}>
            <input type="password" placeholder="password" value={password} onChange={(e)=>{
              setPassword(e.target.value)
            }} />
          </div>
        </div>
        <Link to="/signup"> Don't have an account?</Link>
        <div>
          <button className={`${styles.button} flex gap-1 justify-center items-center cursor-pointer`} type="submit" disabled={loading}>
           {!loading? "Login" : <>
            <div className="h-4 w-4 bg-green-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-4 w-4 bg-green-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-4 w-4 bg-green-400 rounded-full animate-bounce"></div>
           </>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
