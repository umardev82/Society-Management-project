import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from "../config";

const useService = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch services (GET)
  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/service_info/`);
      setServices(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Add service (POST)
  const addService = async (serviceName) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/service_info/`, {
        service_name: serviceName,
      });

      if (response.status === 201) {
        setServices([...services, response.data]);
        return { success: true, message: 'Service added successfully' };
      } else {
        return { success: false, message: 'Failed to add service' };
      }
    } catch (err) {
      console.error('Error adding service:', err);
      return { success: false, message: 'Error adding service' };
    }
  };

  // Edit service (PUT/PATCH)
  const editService = async (id, updatedServiceName) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/service_info/${id}/`, {
        service_name: updatedServiceName,
      });

      if (response.status === 200) {
        // Update service list with edited service
        setServices(services.map(service => service.service_id === id ? response.data : service));
        return { success: true, message: 'Service updated successfully' };
      } else {
        return { success: false, message: 'Failed to update service' };
      }
    } catch (err) {
      console.error('Error updating service:', err);
      return { success: false, message: 'Error updating service' };
    }
  };

  // Delete service (DELETE)
  const deleteService = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/service_info/${id}/`);

      if (response.status === 204) {
        // Fetch the updated service list after deletion
        await fetchServices();
        return { success: true, message: 'Service deleted successfully' };
      } else {
        return { success: false, message: 'Failed to delete service' };
      }
    } catch (err) {
      console.error('Error deleting service:', err);
      return { success: false, message: 'Error deleting service' };
    }
  };

  return {
    services,
    loading,
    error,
    addService,
    editService,
    deleteService,
    fetchServices,
  };
};

export default useService;
