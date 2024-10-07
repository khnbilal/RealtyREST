import React from 'react';
import Navbar from '../../components/Navbar';
import '../../styles/globals.css'; // Import your global styles

const UpdateProperty = () => {
  return (
    <div className="update-property">
      <Navbar />
      <h2>Update Property</h2>
      <form>
        <input type="text" placeholder="Property Address" required />
        <input type="date" placeholder="Listing Date" required />
        <input type="text" placeholder="Property Type" required />
        <input type="number" placeholder="Number of Bedrooms" required />
        <input type="number" placeholder="Number of Bathrooms" required />
        <input type="text" placeholder="Home Size (sq ft)" required />
        <button type="submit">Update Property</button>
      </form>
      <div className="property-images">
        <div className="icon-container">
          <img src="/images/house-icon.png" alt="House Icon" className="icon" />
          <img src="/images/key-icon.jpg" alt="Key Icon" className="icon" />
          <img src="/images/for-sale-icon.jpg" alt="For Sale Icon" className="icon" />
        </div>
      </div>
    </div>
  );
};

export default UpdateProperty;
