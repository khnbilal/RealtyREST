'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UpdatePropertyForm({ property }) {
  const router = useRouter();
  const [formData, setFormData] = useState(property);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/Realty/${property.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to update property');
      }

      router.push('/update-property');
      router.refresh();
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
        required
      />
      <input
        type="date"
        name="listingDate"
        value={formData.listingDate}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="propertyType"
        value={formData.propertyType}
        onChange={handleChange}
        placeholder="Property Type"
        required
      />
      <input
        type="number"
        name="numberOfBedrooms"
        value={formData.bedroom}
        onChange={handleChange}
        placeholder="Bedrooms"
        required
      />
      <input
        type="number"
        name="numberOfBathrooms"
        value={formData.bathroom}
        onChange={handleChange}
        placeholder="Bathrooms"
        required
      />
      <input
        type="number"
        name="homeSize"
        value={formData.homeSize}
        onChange={handleChange}
        placeholder="Home Size (sq ft)"
        required
      />
      <button type="submit">Update Property</button>
    </form>
  );
}
