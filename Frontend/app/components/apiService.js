import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/Realty'; // Base URL for your Spring Boot APIs

// Fetch all properties
export const fetchProperties = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Realty`);
    return response.data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
};

// Add a new property
export const addProperty = async (property) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Realty`, property);
    return response.data;
  } catch (error) {
    console.error("Error adding property:", error);
    throw error;
  }
};

// Update a property
export const updateProperty = async (propertyId, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/Realty/${propertyId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating property:", error);
    throw error;
  }
};

// Delete a property
export const deleteProperty = async (propertyId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/Realty/${propertyId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting property:", error);
    throw error;
  }
};
