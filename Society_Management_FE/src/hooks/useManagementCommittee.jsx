import { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

const useManagementCommittee = () => {
  const [managementCommittee, setManagementCommittee] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchManagementCommittee = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/management-committee/`);
      setManagementCommittee(response.data);
    } catch (error) {
      setErrorMessage('Failed to fetch Management Committee data.');
    }
  };

  const addManagementCommittee = async (mcData) => {
    try {
      await axios.post(`${API_BASE_URL}/management-committee/`, mcData);
      setSuccessMessage('Management Committee member added successfully.');
      fetchManagementCommittee(); // Refresh the list
      return true;
    } catch (error) {
      setErrorMessage('Failed to add Management Committee member.');
      return false;
    }
  };

  // Edit Management Committee
const editManagementCommittee = async (id, updatedData) => {
  try{
    const response = await axios.put(`${API_BASE_URL}/management-committee/${id}/` ,updatedData);
    setManagementCommittee(managementCommittee.map(managementCommittee => managementCommittee.mc_id === id ? response.data : managementCommittee ));
    setSuccessMessage('Management Committee Updated Successfully!');
    return true;
  } catch (error){
    setErrorMessage('Failed to update Management Committee. Please try again.');
    return false;
  }
};

// delete Management Committee

const deleteManagementCommittee = async (id) => {
  try{
    await axios.delete(`${API_BASE_URL}/management-committee/${id}/`);
    setManagementCommittee(managementCommittee.filter(managementCommittee => managementCommittee.mc_id !== id));
    setSuccessMessage('Management Committee deleted sucessfully!');
    return true;
  } catch (error) {
    setErrorMessage('Failed to delete management committee. Please try again.');
    return false;
  }
};

  return {
    managementCommittee,
    fetchManagementCommittee,
    addManagementCommittee,
    successMessage,
    errorMessage,
    deleteManagementCommittee,
    editManagementCommittee
  };
};

export default useManagementCommittee;
