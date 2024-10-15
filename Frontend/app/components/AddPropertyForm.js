import React, { useState } from 'react';
import { addProperty as apiAddProperty } from './apiService'; 

const AddPropertyForm = () => {
  const [property, setProperty] = useState({
    location: '',
    building: '',
    locality: '',
    listingDate: '',
    propertyType: '',
    numberOfBedrooms: '',
    numberOfBathrooms: '',
    homeSize: '',
    price: '',
    houseFlatNo: '',
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prevProperty) => ({
      ...prevProperty,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const maxFileSize = 5 * 1024 * 1024; // 5MB limit
    const validFiles = files.filter((file) => file.size <= maxFileSize);

    if (validFiles.length !== files.length) {
      alert('Some files exceed the maximum size of 5MB and will not be uploaded.');
    }

    setProperty((prevProperty) => ({
      ...prevProperty,
      images: validFiles,
    }));
  };

  const getLocationName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`
      );
      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        const addressComponents = data.results[0].address_components;
        const cityComponent = addressComponents.find(component =>
          component.types.includes("locality") || component.types.includes("administrative_area_level_1")
        );

        return cityComponent ? cityComponent.long_name : "Could not retrieve location name. Please enter manually.";
      } else {
        return "Could not retrieve location name. Please enter manually.";
      }
    } catch (error) {
      console.error("Error fetching location name:", error);
      return "Could not retrieve location name. Please enter manually.";
    }
  };

  const handleLocationDetection = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const locationName = await getLocationName(latitude, longitude);

          setProperty((prevProperty) => ({
            ...prevProperty,
            location: locationName,
          }));
        },
        (error) => {
          console.error('Error detecting location:', error);
          alert('Could not detect location. Please enter manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate property data
    if (
      !property.listingDate ||
      !property.propertyType ||
      !property.numberOfBedrooms ||
      !property.numberOfBathrooms ||
      !property.homeSize ||
      !property.price ||
      !property.houseFlatNo || 
      property.images.length === 0
    ) {
      alert('Please fill all fields correctly.');
      return;
    }

    try {
      // Create a FormData object to handle form submissions with file uploads
      const formData = new FormData();
      formData.append('location', property.location);
      formData.append('building', property.building);
      formData.append('locality', property.locality);
      formData.append('listingDate', property.listingDate);
      formData.append('propertyType', property.propertyType);
      formData.append('numberOfBedrooms', property.numberOfBedrooms);
      formData.append('numberOfBathrooms', property.numberOfBathrooms);
      formData.append('homeSize', property.homeSize);
      formData.append('price', property.price);
      formData.append('houseFlatNo', property.houseFlatNo);

      // Append each image file to the FormData object
      property.images.forEach((image) => {
        formData.append('images', image);
      });

      console.log('Submitting property data:', formData);

      // Call the API method to add the property
      await apiAddProperty(formData);

      // Reset form fields after successful submission
      setProperty({
        location: '',
        building: '',
        locality: '',
        listingDate: '',
        propertyType: '',
        numberOfBedrooms: '',
        numberOfBathrooms: '',
        homeSize: '',
        price: '',
        houseFlatNo: '',
        images: [],
      });

    } catch (error) {
      console.error('Error adding property:', error);
      alert(`Error adding property: ${error.message}`);
    }
  };

  return (
    <div className="add-property-container">
      <div className="add-property-card">
        <h2 className="card-title">Add Property</h2>
        <form onSubmit={handleSubmit} className="property-form">
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={property.location}
              readOnly
            />
            <button
              type="button"
              className="location-detect-button"
              onClick={handleLocationDetection}
            >
              Auto-Detect Location
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="houseFlatNo">House/Flat No.</label>
            <input
              type="text"
              id="houseFlatNo"
              name="houseFlatNo"
              value={property.houseFlatNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="building">Building/Project/Society</label>
            <input
              type="text"
              id="building"
              name="building"
              value={property.building}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="locality">Locality</label>
            <input
              type="text"
              id="locality"
              name="locality"
              value={property.locality}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="listingDate">Listing Date</label>
            <input
              type="date"
              id="listingDate"
              name="listingDate"
              value={property.listingDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="propertyType">Property Type</label>
            <select
              id="propertyType"
              name="propertyType"
              value={property.propertyType}
              onChange={handleChange}
              required
            >
              <option value="">Select Property Type</option>
              <option value="Apartment">Apartment</option>
              <option value="Bungalow">Bungalow</option>
              <option value="Studio">Studio</option>
              <option value="Duplex">Duplex</option>
              <option value="Villa">Villa</option>
              <option value="Penthouse">Penthouse</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="numberOfBedrooms">Bedrooms</label>
            <input
              type="number"
              id="numberOfBedrooms"
              name="numberOfBedrooms"
              value={property.numberOfBedrooms}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="numberOfBathrooms">Bathrooms</label>
            <input
              type="number"
              id="numberOfBathrooms"
              name="numberOfBathrooms"
              value={property.numberOfBathrooms}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="homeSize">Home Size (sq ft)</label>
            <input
              type="number"
              id="homeSize"
              name="homeSize"
              value={property.homeSize}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={property.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label htmlFor="images">Upload Images</label>
            <input
              type="file"
              id="images"
              name="images"
              onChange={handleImageChange}
              multiple
              accept="image/*"
              required
            />
          </div>

          <button type="submit" className="submit-button">Add Property</button>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyForm;
