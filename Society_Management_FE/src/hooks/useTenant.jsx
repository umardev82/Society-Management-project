import axios from "axios";
import { useState, useEffect } from "react";
import API_BASE_URL from "../config";

const useTenant = () => {
    const [tenants, setTenants] = useState([]);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    //Fetch Tenants
const fetchTenants = async () => {
    try{
        const response = await axios.get(`${API_BASE_URL}/tenant/`);
        setTenants(response.data);
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
    fetchTenants();
    fetchCountries();
},[]);


// Add tenant
const addTenant = async (tenantData) => {
    try{
      console.log('add tenant...')
      const response = await axios.post(`${API_BASE_URL}/tenant/`, tenantData);
      setTenants([...tenants, response.data]);
      setSuccessMessage('Tenant Added Successfully!');
      return true;
    }catch(error){
       // Check if the error response has data
       if (error.response && error.response.data) {
          // Extract error messages from the response
          const errorData = error.response.data;
          const formattedErrors = Object.entries(errorData)
            .map(([field, messages]) => `${field}: ${messages.join(' ')}`)
            .join(', ');
          setErrorMessage(formattedErrors);  // Set error message
        } else{
           setErrorMessage('Failed to add Tenant. Please try again.');
        }
     
      return false;
    }
  };


// Edit Tenant
const editTenant = async (id, updatedData) => {
  try{
    const response = await axios.put(`${API_BASE_URL}/tenant/${id}/` ,updatedData);
    setTenants(tenants.map(tenant => tenant.tenant_id === id ? response.data : tenant ));
    setSuccessMessage('Tenant Updated Successfully!');
    return true;
  } catch (error){
    setErrorMessage('Failed to update Tenant. Please try again.');
    return false;
  }
};

// delete Tenant

const deleteTenant = async (id) => {
  try{
    await axios.delete(`${API_BASE_URL}/tenant/${id}/`);
    setTenants(tenants.filter(tenant => tenant.tenant_id !== id));
    setSuccessMessage('Tenant deleted sucessfully!');
    return true;
  } catch (error) {
    setErrorMessage('Failed to delete tenant. Please try again.');
    return false;
  }
};

  
return{
tenants,
countries,
cities,
fetchCities,
addTenant,
fetchTenants,
editTenant,
deleteTenant,
error,
loading,
errorMessage,
successMessage,
};
}

export default useTenant;