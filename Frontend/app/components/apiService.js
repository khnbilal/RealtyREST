import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/Realty'; // Base URL for your Spring Boot APIs

// Fetch all properties
export const fetchProperties = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching properties:", error.response?.data || error.message);
    throw error;
  }
};

// Add a new property
export const addProperty = async (propertyDetails) => {
  const formData = new FormData();

  // Append property details to the FormData object
  formData.append('location', propertyDetails.location);
  formData.append('houseFlatNo', propertyDetails.houseFlatNo);
  formData.append('building', propertyDetails.building);
  formData.append('locality', propertyDetails.locality);
  formData.append('listingDate', propertyDetails.listingDate);
  formData.append('propertyType', propertyDetails.propertyType);
  formData.append('numberOfBedrooms', propertyDetails.numberOfBedrooms);
  formData.append('numberOfBathrooms', propertyDetails.numberOfBathrooms);
  formData.append('homeSize', propertyDetails.homeSize);
  formData.append('price', propertyDetails.price);

// Append images to the FormData object
if (propertyDetails.images && propertyDetails.images.length > 0) {
  propertyDetails.images.forEach((image) => {
    formData.append('images', image);
  });
}

  try {
    const response = await axios.post(`${API_BASE_URL}/add`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding property:", error.response?.data || error.message);
    throw error;
  }
};


// Update a property
export const updateProperty = async (propertyId, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${propertyId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating property:", error.response?.data || error.message);
    throw error;
  }
};

// Delete a property
export const deleteProperty = async (propertyId) => {
  try {
    console.log('Deleting property with ID:', propertyId); // Debugging log
    const response = await axios.delete(`${API_BASE_URL}/${propertyId}`);
    console.log('Property deleted:', response.data); // Log success message
    return response.data;
  } catch (error) {
    console.error("Error deleting property:", error.response?.data || error.message);
    if (error.response) {
      console.error('Response data:', error.response.data); // Log response data
      console.error('Response status:', error.response.status); // Log response status
    }
    throw error; // Rethrow error to handle in the calling component
  }
};
