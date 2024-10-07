import Link from 'next/link';
import React from 'react';
import Navbar from './components/Navbar';
import '../styles/globals.css';

const Home = () => {
  return (
    <div className="home-container">
      <Navbar /> {/* Add the Navbar here */}
      <div className="hero-section">
        <video autoPlay loop muted className="background-video">
          <source src="/images/video-background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Wrap heading and description in a section */}
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
        </div>
      </div>
    </div>
  );
};

export default Home;
