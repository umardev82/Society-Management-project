import API_BASE_URL from '../config';
import { useState,useEffect } from 'react';
import axios from 'axios';

const useMaintainanceCost = () => {
const [maintenanceCost, setMaintenanceCost] = useState([]);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(true);

//  Fetch MaintenanceCost
const fetchMaintenanceCost = async () => {
    try{
        const response = await axios.get(`${API_BASE_URL}/maintenance_costs/`);
        setMaintenanceCost(response.data);
    }catch(err) {
        setError(err);
    }finally{
        setLoading(false);
    }
};
useEffect(() => {
   fetchMaintenanceCost();
},[]);
//Add Maintenance cost
const addMaintenanceCost = async (mcTitle, mcDate, mcAmount, mcDetails ) => {
    try{
        const response = await axios.post(`${API_BASE_URL}/maintenance_costs/`,{
            m_title: mcTitle,
            m_date: mcDate,
            m_amount: mcAmount,
            m_details: mcDetails,
        });
        if (response.status === 201 ){
            setMaintenanceCost([...maintenanceCost, response.data]);
            return { success:true, message:'Maintenance Cost Added Successfully'};
        }else{
            return { success: false, message: 'Failed to add Maintenance Cost'};
        }
    } catch (err) {
        console.error('Error Adding Maintenance Cost:', err);
        return { success: false, message: 'Error adding Maintenance Cost'};
    }
};
// Edit maintenance cost 
const editMaintenanceCost = async (id, updatedMcTitle, updatedMcDate, updatedMcAmount, updatedMcDetails) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/maintenance_costs/${id}/`, {
        m_title: updatedMcTitle,    // **Marked Change: Match API fields**
        m_date: updatedMcDate,      // **Marked Change: Match API fields**
        m_amount: updatedMcAmount,  // **Marked Change: Match API fields**
        m_details: updatedMcDetails // **Marked Change: Match API fields**
      });
  
      if (response.status === 200) {
        setMaintenanceCost((prev) =>
          prev.map((mc) => (mc.m_id === id ? response.data : mc)) // **Marked Change: State Update Logic**
        );
        return { success: true, message: 'Maintenance cost updated successfully' };
      } else {
        return { success: false, message: 'Failed to update maintenance cost' };
      }
    } catch (err) {
      console.error('Error updating maintenance cost:', err);
      return { success: false, message: 'Error updating maintenance cost' };
    }
  };
  
// Delete maintenance cost

const deleteMaintenanceCost = async (id) => {
    try{
        const response = await axios.delete(`${API_BASE_URL}/maintenance_costs/${id}/`);
        if(response.status === 204){
            await fetchMaintenanceCost();
            return { success: true, message: 'Maintenance cost deleted successfully'};
        } else{
            return {success: false, message: 'Failed to delete maintenance cost'};
        }
    } catch(err){
        console.error('Error deleting maintenance cost:', err);
        return { success: false, message: 'Error deleting maintenance cost'};
    }
    };

return { 
    fetchMaintenanceCost,
    maintenanceCost,
    error,
    loading,
    editMaintenanceCost,
    deleteMaintenanceCost,
    addMaintenanceCost
}
  
}

export default useMaintainanceCost




