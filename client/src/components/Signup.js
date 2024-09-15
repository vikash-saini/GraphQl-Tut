import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ADD_USER } from "../gqlOperations/mutations";

function Signup() {
  const [formData, setFormData] = useState({});

  const [signupUser,{data,loading,error}] = useMutation(ADD_USER);

  if (loading) return <p>Loading...</p>;


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const hanldeLoginSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    signupUser({
        variables:{
            UserNew:formData
        }
    });
  };
  return (
    <div className="w-4/12 m-auto">
        {
            error && <div className="text-center red card-panel">{error.message}</div>
        }
        {
            data && data.user && <div className="text-center green card-panel">User {data.user.firstName} added successfully</div>
        }
      <form onSubmit={hanldeLoginSubmit}>
        <input
          type="text"
          placeholder="FirstName"
          name="firstName"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="LastName"
          name="lastName"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <button className="btn waves-effect waves-light" type="submit" name="action">Submit
        </button>
        <Link to='/login'><p>Already have account?</p></Link>
      </form>
    </div>
  );
}

export default Signup;
