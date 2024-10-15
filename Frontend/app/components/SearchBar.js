"use client"; // Client component declaration

import React, { useState } from 'react';
import axios from 'axios';
import ReactSlider from 'react-slider';
import '../../styles/globals.css';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBetqMyj1bavwSU39RiIo0yQhm9qjzz2L8';

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [radius, setRadius] = useState('');
  const [numBedrooms, setNumBedrooms] = useState('');
  const [minPrice, setMinPrice] = useState(0); // Default to ₹0
  const [maxPrice, setMaxPrice] = useState(50000000); // Default to ₹5Cr+
  const [propertyType, setPropertyType] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // Geocode the location to get latitude and longitude
      const geocodeResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${GOOGLE_MAPS_API_KEY}`
      );

      if (geocodeResponse.data.results.length > 0) {
        const { lat, lng } = geocodeResponse.data.results[0].geometry.location;
        
        const searchCriteria = {
          latitude: lat,
          longitude: lng,
          radius,
          numBedrooms,
          minPrice,
          maxPrice,
          propertyType,
        };
        onSearch(searchCriteria);
      } else {
        alert('Location not found. Please enter a valid location or landmark.');
      }
    } catch (error) {
      console.error('Error fetching geocoding data:', error);
      alert('An error occurred while searching for the location.');
    }
  };

  return (
    <div className="search-bar-container">
      <form className="search-form" onSubmit={handleSearch}>
        {/* Location/Landmark Input */}
        <input
          type="text"
          placeholder="Enter a Location/Landmark"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        {/* Radius Dropdown */}
        <select
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
        >
          <option value="">Select Radius</option>
          <option value="1">1 km</option>
          <option value="2">2 km</option>
          <option value="3">3 km</option>
          <option value="5">5 km</option>
          <option value="10">10 km</option>
        </select>


        {/* Number of Bedrooms Dropdown */}
        <select
          value={numBedrooms}
          onChange={(e) => setNumBedrooms(e.target.value)}
        >
          <option value="">Number of Bedrooms</option>
          {[...Array(10)].map((_, index) => (
            <option key={index} value={`${index + 1}BHK`}>
              {`${index + 1}BHK`}
            </option>
          ))}
        </select>

        {/* Property Type Dropdown */}
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="">Select Property Type</option>
          <option value="Apartment">Apartment</option>
          <option value="Bungalow">Bungalow</option>
          <option value="Studio">Studio</option>
          <option value="Duplex">Duplex</option>
          <option value="Villa">Villa</option>
          <option value="Penthouse">Penthouse</option>
        </select>

        {/* Single Price Range Slider */}
        <div className="price-range">
          <label htmlFor="priceRange" style={{ color: '#fff', marginBottom: '10px' }}>
            Price Range: ₹{minPrice.toLocaleString()} - ₹{maxPrice.toLocaleString()}
          </label>
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            value={[minPrice, maxPrice]}
            min={0}
            max={50000000}
            onChange={(values) => {
              setMinPrice(values[0]);
              setMaxPrice(values[1]);
            }}
            step={100000} // Adjust the step as necessary
            withTracks
          />
        </div>

        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
