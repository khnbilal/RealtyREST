import { useState, useEffect } from 'react';
import '../styles/globals.css';
const UpdateProperty = ({ selectedProperty, updateProperty }) => {
  const [property, setProperty] = useState(selectedProperty);

  useEffect(() => {
    setProperty(selectedProperty);
  }, [selectedProperty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProperty(property);
  };

  return (
    <div className="update-property">
      <h2>Update Property</h2>
      <form onSubmit={handleSubmit}>
        <label>Address:</label>
        <input type="text" name="address" value={property.address} onChange={handleChange} />

        <label>Listing Date:</label>
        <input type="date" name="listingDate" value={property.listingDate} onChange={handleChange} />

        <label>Property Type:</label>
        <input type="text" name="propertyType" value={property.propertyType} onChange={handleChange} />

        <label>Bedrooms:</label>
        <input type="number" name="numberOfBedrooms" value={property.numberOfBedrooms} onChange={handleChange} />

        <label>Bathrooms:</label>
        <input type="number" name="numberOfBathrooms" value={property.numberOfBathrooms} onChange={handleChange} />

        <label>Home Size (sq ft):</label>
        <input type="number" name="homeSize" value={property.homeSize} onChange={handleChange} />

        <button type="submit">Update Property</button>
      </form>
    </div>
  );
};

export default UpdateProperty;
