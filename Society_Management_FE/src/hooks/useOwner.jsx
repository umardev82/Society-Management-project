import axios from "axios";
import { useState, useEffect } from "react";
import API_BASE_URL from "../config";

const useOwner = () => {
   const [owners, setOwners] = useState([]);
   const [countries, setCountries] = useState([]);
   const [cities, setCities] = useState([]);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(true);
   const [successMessage, setSuccessMessage] = useState('');
   const [errorMessage, setErrorMessage] = useState('');


// Fetch Owner
const fetchOwners = async () => {
try{
    const response = await axios.get(`${API_BASE_URL}/owners/`);
    setOwners(response.data);
}
catch (err){
    setError(err);
} finally{
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
    fetchOwners();
   fetchCountries();
  }, []);


// Add owner
const addOwner = async (ownerData) => {
  try {
    console.log('add owner...');
    const response = await axios.post(`${API_BASE_URL}/owners/`, ownerData);
    
    // Ensure the response is JSON and contains expected data
    if (response && response.data) {
      setOwners([...owners, response.data]);
      setSuccessMessage('Owner Added Successfully!');
      return true;
    } else {
      throw new Error('Unexpected response format');
    }
  } catch (error) {
    // Log the full error object for debugging
    console.error('Error adding owner:', error.response || error.message);
    
    // Set a user-friendly error message
    setErrorMessage(error?.response?.data?.properties?.[0] || 'Failed to add Owner. Please try again.');
    
    // Optionally, log the actual response to see what went wrong
    if (error.response) {
      console.log('Error Response:', error.response.data);
    }
    
    return false;
  }
};


//edit Owner (put)
const editOwner = async (id, updatedData) => {
try{
  const response = await axios.put(`${API_BASE_URL}/owners/${id}/` ,updatedData);
  setOwners(owners.map(owner => owner.owner_id === id ? response.data : owner));
  setSuccessMessage('Owner Updated Successfully!');
  return true;
} catch (error) {
  setErrorMessage('Failed to update Owner. Please try again.');
  return false;
}
};

// delete Owner (DELETE)
const deleteOwner = async (id) => {
 try{
  await axios.delete(`${API_BASE_URL}/owners/${id}/`);
  setOwners(owners.filter(owner => owner.owner_id !== id));
  setSuccessMessage('Owner deleted successfully!');
  return true;
 } catch (error) {
  setErrorMessage( 'Failed to delete owner. Please try again.');
  return false;
 }
};


  return {
    owners,
    countries,
    cities,
    loading,
    error,
    fetchOwners,
    fetchCities,
    addOwner,
    editOwner,
    deleteOwner,
    successMessage,
    errorMessage,
};  
}

export default useOwner;