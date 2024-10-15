import React from 'react';

const PropertyCard = ({ property, handleDelete }) => {
  return (
    <div className="property-details">
      <h3>{property.address}</h3>
      <p>Listing Date: {new Date(property.listingDate).toLocaleDateString()}</p>
      <p>Property Type: {property.propertyType}</p>
      <p>Bedrooms: {property.numberOfBedrooms}</p>
      <p>Bathrooms: {property.numberOfBathrooms}</p>
      <p>Home Size: {property.homeSize} sq ft</p>
      <p>Location: {property.location}</p>
      <p>Building: {property.building}</p>
      <p>House/Flat No.: {property.houseFlatNo}</p> {/* New Field Added */}
      <p>Locality: {property.locality}</p>
      {property.propertyImage && (
        <img src={`data:image/jpeg;base64,${property.propertyImage}`} alt={property.address} />
      )}
      <button onClick={() => handleDelete(property.id)}>Delete Property</button>
    </div>
  );
};

export default PropertyCard;
