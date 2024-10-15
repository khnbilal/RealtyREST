"use client"; // Client component declaration

import Link from 'next/link';
import React from 'react';
import SearchBar from './components/SearchBar';
import '../styles/globals.css';

const Home = () => {
  const handleSearch = (searchCriteria) => {
    console.log('Search Criteria:', searchCriteria);
    // Implement your search logic here, possibly redirecting or fetching filtered properties
  };

  return (
    <div className="home-container">

      {/* Search Bar Section */}
      <div className="search-bar-section">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="hero-section">
        <video autoPlay loop muted className="background-video">
          <source src="/images/video-background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <section className="text-section">
          <h1 className="bold-text">Welcome to RealtyREST</h1>
          <p className="description bold-text">
            Manage your property listings efficiently with our intuitive platform. 
            Add, update, and view properties seamlessly. Let&apos;s make property management 
            easier and more accessible for everyone!
          </p>
        </section>

        <div className="button-container">
          <Link href="/add-property">
            <button className="primary-button">Add Property</button>
          </Link>
          <Link href="/update-property">
            <button className="secondary-button">Update Property</button>
          </Link>
          <Link href="/show-properties">
            <button className="secondary-button">Show All Properties</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
