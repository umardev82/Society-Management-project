import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from "../config";

const useProperty = () => {
  const [properties, setProperties] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch properties (GET)
  const fetchProperties = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/property_info/`);
      setProperties(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
    // Fetch countries (GET)
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://countriesnow.space/api/v0.1/countries');
        setCountries(response.data.data);  // Data structure based on API response
      } catch (error) {
        setError(error);
      }
    };
  
    // Fetch cities based on selected country
    const fetchCities = async (country) => {
      try {
        const response = await axios.post('https://countriesnow.space/api/v0.1/countries/cities', { country });
        setCities(response.data.data); // Data structure based on API response
      } catch (error) {
        setError(error);
      }
    };

  useEffect(() => {
    fetchProperties();
    fetchCountries();
  }, []);

  // Add property (POST)
  const addProperty = async (propertyData) => {
    try {
      console.log('add property...')
      const response = await axios.post(`${API_BASE_URL}/property_info/`, propertyData);

      setProperties([...properties, response.data]);
      setSuccessMessage('Property added successfully!');
      return true;
    } catch (error) {
      setErrorMessage(error?.response?.data?.property_number?.[0]  || 'Failed to add property. Please try again.');
      return false;
    }
  };

  // editproperty
  const editProperty = async (id, updatedData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/property_info/${id}/`, updatedData);
      setProperties(properties.map(property => property.property_id === id ? response.data : property));
      return { success: true, message: 'Property updated successfully!' };
    } catch (error) {
      return { 
        success: false, 
        message: error?.response?.data?.property_number?.[0] || 'Failed to update property. Please try again.' 
      };
    }
  };
  

  // Delete property (DELETE)
  const deleteProperty = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/property_info/${id}/`);
      setProperties(properties.filter(property => property.property_id !== id)); // Change to property.property_id
      setSuccessMessage('Property deleted successfully!');
      return true;
    } catch (error) {
      setErrorMessage('Failed to delete property. Please try again.');
      return false;
    }
  };

  return {
    properties,
    countries,
    cities,
    loading,
    error,
    addProperty,
    fetchCities,
    editProperty,
    deleteProperty,
    fetchProperties,
    successMessage,
    errorMessage,
  };
};

export default useProperty;
