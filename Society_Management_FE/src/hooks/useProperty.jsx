import { useState, useEffect } from 'react';
import axios from 'axios';

const useProperty = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch properties (GET)
  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/property_info/');
      setProperties(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Add property (POST)
  const addProperty = async (propertyData) => {
    try {
      console.log('..shuw')
      const response = await axios.post('http://127.0.0.1:8000/property_info/', propertyData);
      setProperties([...properties, response.data]);
      setSuccessMessage('Property added successfully!');
      return true;
    } catch (error) {
      setErrorMessage('Failed to add property. Please try again.');
      return false;
    }
  };

  // Edit property (PUT)
  const editProperty = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/property_info/${id}/`, updatedData);
      setProperties(properties.map(property => property.property_id === id ? response.data : property)); // Change to property.property_id
      setSuccessMessage('Property updated successfully!');
      return true;
    } catch (error) {
      setErrorMessage('Failed to update property. Please try again.');
      return false;
    }
  };

  // Delete property (DELETE)
  const deleteProperty = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/property_info/${id}/`);
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
    loading,
    error,
    addProperty,
    editProperty,
    deleteProperty,
    fetchProperties,
    successMessage,
    errorMessage,
  };
};

export default useProperty;
