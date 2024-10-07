"use client"; // Add this line at the very top

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Update the import to use 'next/navigation'

const UpdateProperty = () => {
  const router = useRouter();
  const { id } = router.query || {}; // Add a fallback to avoid destructuring errors

  const [property, setProperty] = useState({
    address: '',
    listingDate: '',
    propertyType: '',
    bedroom: '',
    bathroom: '',
    homeSize: '',
  });

  // Fetch property details when the component mounts
  useEffect(() => {
    if (id) {
      fetch(`/api/Realty/${id}`) // Adjust this path to match your API
        .then((response) => response.json())
        .then((data) => {
          setProperty(data);
        })
        .catch((error) => console.error('Error fetching property:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/Realty/${id}`, { // Adjust this path to match your API
      method: 'PUT', // Use 'PATCH' if you only want to update certain fields
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(property),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        router.push('/update-property'); // Redirect after successful update
      })
      .catch((error) => console.error('Error updating property:', error));
  };

  return (
    <div>
      <h1>Update Property {id}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="address"
          value={property.address}
          onChange={handleChange}
          placeholder="Address"
          required
        />
        <input
          type="date"
          name="listingDate"
          value={property.listingDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="propertyType"
          value={property.propertyType}
          onChange={handleChange}
          placeholder="Property Type"
          required
        />
        <input
          type="number"
          name="bedroom"
          value={property.bedroom}
          onChange={handleChange}
          placeholder="Bedrooms"
          required
        />
        <input
          type="number"
          name="bathroom"
          value={property.bathroom}
          onChange={handleChange}
          placeholder="Bathrooms"
          required
        />
        <input
          type="number"
          name="homeSize"
          value={property.homeSize}
          onChange={handleChange}
          placeholder="Home Size (sq ft)"
          required
        />
        <button type="submit">Update Property</button>
      </form>
    </div>
  );
};

export default UpdateProperty;
