import React from 'react';
import Link from 'next/link'; // Add this line to import Link

const PropertyCard = ({ property }) => {
  return (
    <div className="property-card">
      <h2>{property.address}</h2>
      <p>Listing Date: {new Date(property.listingDate).toLocaleDateString()}</p>
      <p>Property Type: {property.propertyType}</p>
      <p>Bedrooms: {property.bedrooms}</p>
      <p>Bathrooms: {property.bathrooms}</p>
      <p>Home Size: {property.homeSize} sq ft</p>
      <Link href={`/update-property?id=${property.id}`}>
        <button>Update Property</button>
      </Link>
      <button onClick={() => handleDelete(property.id)}>Delete Property</button>
    </div>
  );
};

export default PropertyCard;
