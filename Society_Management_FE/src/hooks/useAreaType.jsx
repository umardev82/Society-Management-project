import {useState, useEffect} from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

const useAreaType = () => {
   const [areaTypes, setAreaTypes] = useState([]);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(true);

   // Fetch Area
   const fetchAreaTypes = async () => {
    try{
        const response = await axios.get(`${API_BASE_URL}/area-types/`);
        setAreaTypes(response.data);
    }catch (err){
        setError(err);
    }finally {
        setLoading(false);
    }
   };
   useEffect(() => {
    fetchAreaTypes();
   }, []);

   //Add AreaType

   const addAreaType = async (areaTypeName, areaValue) =>{
    try{
        const response = await axios.post(`${API_BASE_URL}/area-types/`, {
            area_type_name: areaTypeName,
            area_value: areaValue,
        });
        if (response.status === 201) {
            setAreaTypes([...areaTypes,response.data]);
            return { success:true, message: 'Area Type Added Successfully'};
        } else{
            return { success: false, message: 'Failed to add Area Type'};
        }        
    }
    catch (err) {
        console.error('Error adding area type:', err);
        return { success:false, message:'Error adding area type'};
    }
   };

   //Edit Area Type
   const editAreaType = async (id, updatedAreaTypeName, updatedAreaValue) => {
    try{
        const response = await axios.put(`${API_BASE_URL}/area-types/${id}/`,{
            area_type_name: updatedAreaTypeName,
            area_value: updatedAreaValue,
        });
        if (response.status === 200){
            setAreaTypes(areaTypes.map(areaType => areaType.id === id ? response.data : areaType));
            await fetchAreaTypes();
            return { success: true, message: 'Area type updated successfully'};
        }else {
            return { success:false, message:'Failed to update area type'};
        }
    } catch(err){
        console.error('Error updating area type:', err);
        return {success: false, message:'Error updating area type'};
    }
   };

   // Delete Area Type
   const deleteAreaType = async (id) => {
    try{
        const response = await axios.delete(`${API_BASE_URL}/area-types/${id}/`);

        if(response.status === 204){
            await fetchAreaTypes();
            return { success:true, message: 'Area Type deleted successfully'};
        }else{
            return { success:false, message:'Failed to delete area type'};
        }
    } catch(err){
        console.error('Error deleting area type:', err);
        return{success:false, message:'Error deleting area type'};
    }
   };

   return{
     areaTypes,
     loading,
     error,
     addAreaType,
     editAreaType,
     deleteAreaType,
     fetchAreaTypes,
   };
};

export default useAreaType;