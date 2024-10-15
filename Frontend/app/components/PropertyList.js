import React, { useEffect, useState } from 'react';
import { fetchProperties, deleteProperty } from './apiService';
import PropertyCard from './PropertyCard';
import '../../styles/globals.css';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPropertyId, setExpandedPropertyId] = useState(null); // To handle expanded view

  useEffect(() => {
    const getProperties = async () => {
      try {
        const data = await fetchProperties();
        setProperties(data);
      } catch (err) {
        setError('Error fetching properties');
      } finally {
        setLoading(false);
      }
    };

    getProperties();
  }, []);

  const handleDelete = async (propertyId) => {
    const confirmed = window.confirm('Are you sure you want to delete this property?');
    if (confirmed) {
      try {
        await deleteProperty(propertyId);
        setProperties(properties.filter(property => property.id !== propertyId));
      } catch (err) {
        setError('Error deleting property');
      }
    }
  };

  const togglePropertyDetails = (propertyId) => {
    console.log(`Toggling details for property ID: ${propertyId}`); // Debugging line
    setExpandedPropertyId(expandedPropertyId === propertyId ? null : propertyId);
  };

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="property-list-container">
      {properties.map(property => (
        <div key={property.id} className="property-item">
          <div 
            className="property-building-name" 
            onClick={() => togglePropertyDetails(property.id)}
          >
            {property.building}
          </div>
          {expandedPropertyId === property.id && (
            <div className="property-details">
              <PropertyCard
                property={property}
                handleDelete={handleDelete}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
