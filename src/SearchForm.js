import React from 'react';
import { useState } from 'react';
import "./SearchForm.css";

// change the props method as search instead of two seperate 
function SearchForm({search}) {
  const INITIALFORMSTATE = {search: ""};
  const [formData, setFormData] = useState(INITIALFORMSTATE);

  const handleSubmit = evt => {
    evt.preventDefault();
    search(formData);
    setFormData(INITIALFORMSTATE);
    
  }

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData({[name]:value})
  }

  return (
    <form className="SearchForm" onSubmit={handleSubmit}>
      <input
        id="search"
        name="search"
        placeholder="Search"
        value={formData.search}
        onChange={handleChange}
      />
      <button>Submit</button>
    </form>
  );
}

export default SearchForm;