import React, { useState } from 'react';
import "./SignUpForm.css";

function SignUpForm({signUp}) {
  const INITIAL_STATE = { username: "", password: "", first_name: "", last_name: "", email: "" }
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    signUp(formData);
    setFormData(INITIAL_STATE);
  }

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((currData) => ({...currData,[name]:value}))
  }

  return (
    <form className="SignUpForm" onSubmit={handleSubmit}>
      <input name="username" value= {formData.username} placeholder="Username" onChange={handleChange} />
      <input type="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange} />
      <input name="first_name" value={formData.first_name} placeholder="First name" onChange={handleChange}/>
      <input name="last_name" value={formData.last_name} placeholder="Last name" onChange={handleChange} />
      <input name="email" value={formData.email} placeholder="Email" onChange={handleChange} />
      <button>Sign up</button>
    </form>
  );
}

export default SignUpForm;