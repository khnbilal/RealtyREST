"use client"; // Client component declaration

import Link from 'next/link';
import React, { useState } from 'react';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Search term:', searchTerm);
  };

  return (
    <nav className="navbar">
      <div className="company-logo">
        <img src="/favicon.ico" alt="Company Icon" />
        <span className="company-name">RealtyREST</span>
      </div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About Us</Link> {/* Add About Us link */}
        </li>
        <li>
          <Link href="/contact">Contact Us</Link> {/* Add Contact Us link */}
        </li>
      </ul>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search properties..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  );
};

export default Navbar;
