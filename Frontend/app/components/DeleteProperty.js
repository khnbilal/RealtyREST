import React from 'react';
import axios from 'axios';

const DeleteProperty = ({ id }) => {
  const handleDelete = () => {
    axios.delete(`http://localhost:8080/api/Realty/${id}`)
      .then(response => alert('Property deleted successfully!'))
      .catch(error => console.error('Error deleting property', error));
  };

  return <button onClick={handleDelete}>Delete Property</button>;
};

export default DeleteProperty;
