import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateProperty = ({ id }) => {
  const [property, setProperty] = useState({});

  useEffect(() => {
    // Fetch the existing property by ID
    axios.get(`http://localhost:8080/api/Realty/${id}`)
      .then(response => setProperty(response.data))
      .catch(error => console.error('Error fetching property', error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:8080/api/Realty/${id}`, property)
      .then(response => alert('Property updated successfully!'))
      .catch(error => console.error('Error updating property', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={property.address} 
        onChange={e => setProperty({ ...property, address: e.target.value })}
      />
      {/* Add inputs for other fields */}
      <button type="submit">Update Property</button>
    </form>
  );
};

export default UpdateProperty;
