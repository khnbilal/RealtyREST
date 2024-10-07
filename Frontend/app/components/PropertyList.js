import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the list of properties from your Spring Boot backend
    axios.get('http://localhost:8080/api/Realty/Realty')
      .then(response => setProperties(response.data))
      .catch(error => {
        console.error('Error fetching properties:', error);
        setError('Failed to load properties. Please try again later.');
      });
  }, []);

  // Function to handle property deletion
  const handleDelete = async (propertyId) => {
    try {
      await axios.delete(`http://localhost:8080/api/Realty/Realty/${propertyId}`);
      // Update the list by removing the deleted property
      setProperties(properties.filter(property => property.id !== propertyId));
    } catch (error) {
      console.error('Error deleting property:', error);
      setError('Failed to delete property. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Properties List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if any */}
      
      <ul>
        {properties.length === 0 ? (
          <p>No properties available.</p>
        ) : (
          properties.map((property) => (
            <li key={property.id}>
              {property.address} - {property.propertyType} - {property.homeSize} sq.ft.

              {/* Update Button */}
              <Link href={`/update-property/${property.id}`}>
                <button style={{ marginLeft: '10px' }}>Update</button>
              </Link>

              {/* Delete Button */}
              <button 
                onClick={() => handleDelete(property.id)} 
                style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default PropertyList;
