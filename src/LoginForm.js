import React, { useState } from 'react';
import "./LoginForm.css";

function LoginForm({ login }) {
  const INITIAL_STATE = { username: "", password: "" }
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    login(formData);
    setFormData(INITIAL_STATE);
  }

  const handleChange = (evt) => {
    const { name, value } = evt.target
    setFormData((currData) => ({ ...currData, [name]: value }));
  }


  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
      <input name="username" value={formData.username} placeholder="Username" onChange={handleChange} />
      <input type="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange} />
      <button>Login</button>
    </form>
  )
}

export default LoginForm;