import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_USER } from '../gqlOperations/mutations';

function Login() {
    let navigate = useNavigate();
    const [formData,setFormData] = useState({});
    const [loginUser,{data,loading,error}]=useMutation(LOGIN_USER);

    const handleChange =(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
    const hanldeLoginSubmit =(e)=>{
        e.preventDefault();
        console.log(formData);
       loginUser({
            variables:{
                user:formData
            }
        })    
    }

    if (data && data.user.token) {
        localStorage.setItem('token',data.user.token);
        navigate('/');
    }
  return (
    <div className="w-4/12 m-auto">
      <form onSubmit={hanldeLoginSubmit}>
        <input type="text" placeholder='Email' name="email" onChange={handleChange}/>
        <input type="password" placeholder='Password' name="password" onChange={handleChange}/>
        <button className="btn waves-effect waves-light" type="submit" name="action">Submit
        </button>
        <Link to='/signup'><p>Do not have an account?</p></Link>
      </form>
    </div>
  )
}

export default Login
