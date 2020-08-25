import React, { useState } from "react";
import "./UserProfileForm.css";

function UserProfileForm({ userData, updateUser }) {
  console.log("userData", userData);
  const INITIAL_STATE = { first_name: userData.first_name, last_name: userData.last_name, email: userData.email, photo_url: userData.photo_url || "", password: "" }

  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((currData) => ({ ...currData, [name]: value }));
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (formData.photo_url === "") {
      delete (formData.photo_url);
    }
    updateUser(formData);
    // reset the password field
    setFormData((currData) => ({ ...currData, password: "" }));
  }

  return (
    <form className="UserProfileForm" onSubmit={handleSubmit}>
      <p className="UserProfileForm-label">Username</p>
      <p className="UserProfileForm-username">{userData.username}</p>
      <input name="first_name" value={formData.first_name} placeholder="First name" onChange={handleChange} />
      <input name="last_name" value={formData.last_name} placeholder="Last name" onChange={handleChange} />
      <input name="email" value={formData.email} placeholder="Email" onChange={handleChange} />
      <input name="photo_url" value={formData.photo_url} placeholder="Photo URL" onChange={handleChange} />
      <input name="password" value={formData.password} placeholder="Re-enter password" type="password" onChange={handleChange} />
      <button>Save Changes</button>
    </form>
  );
}

export default UserProfileForm;


