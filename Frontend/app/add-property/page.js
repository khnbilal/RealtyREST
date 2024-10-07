// Mark this file as a Client Component
"use client"; 

import { useState } from 'react';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    address: '',
    listingDate: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    homeSize: '',
  });

  // Handle form change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch('http://localhost:8080/api/Realty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Property added successfully!');
      } else {
        alert('Failed to add property.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Add Property</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="listingDate"
          placeholder="Listing Date"
          value={formData.listingDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="propertyType"
          placeholder="Property Type"
          value={formData.propertyType}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="bedrooms"
          placeholder="Number of Bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="bathrooms"
          placeholder="Number of Bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="homeSize"
          placeholder="Home Size (sq ft)"
          value={formData.homeSize}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Property</button>
      </form>
    </div>
  );
};

export default AddProperty;
