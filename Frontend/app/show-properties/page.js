"use client";

import React from 'react';
import Navbar from '../components/Navbar';
import PropertyList from '../components/PropertyList'; // Import PropertyList
import '../../styles/globals.css'; // Adjust the path if necessary

const ShowProperties = () => {
  return (
    <div className="show-properties-container">
      <Navbar />
      <h1 className="page-title">All Properties</h1>
      <PropertyList /> {/* Use PropertyList to display properties */}
    </div>
  );
};

export default ShowProperties;
