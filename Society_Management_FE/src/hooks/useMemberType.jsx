import axios from "axios";
import API_BASE_URL from "../config";
import { useState, useEffect } from "react";

const useMemberType = () => {
 const [memberTypes, setMemberTypes] = useState([]);
 const [error, setError] = useState(null);
 const [loading, setLoading] = useState(true);

//  Fetch Member Type
const fetchMemberTypes = async () => {
    try{
        const response = await axios.get(`${API_BASE_URL}/member-type-setup/`);
        setMemberTypes(response.data);
    }catch(err) {
        setError(err);
    }finally{
        setLoading(false);
    }
};
useEffect(() => {
   fetchMemberTypes();
},[]);

// Add member type
const addMemberType = async (memberTypeName) => {
    try{
        const response = await axios.post(`${API_BASE_URL}/member-type-setup/`,{
            member_type_name:memberTypeName,
        });
        if (response.status === 201 ){
            setMemberTypes([...memberTypes, response.data]);
            return { success:true, message:'Member Type Added Successfully'};
        }else{
            return { success: false, message: 'Failed to add Member Type'};
        }
    } catch (err) {
        console.error('Error Adding Member Type:', err);
        return { success: false, message: 'Error adding Memeber Type'};
    }
};

// Edit Member Type 
const editMemberType = async (id, updatedMemberTypeName) => {
    try{
        const response = await axios.put(`${API_BASE_URL}/member-type-setup/${id}/`,{
            member_type_name: updatedMemberTypeName,
        });
        if (response.status === 200 ) {
            setMemberTypes(memberTypes.map(memberType => memberType.member_type_id === id? response.data : memberType));
            return {success: true, message: 'Member Type Updated Successfully'};
        } else{
            return{ success: false, message: 'Failed to update member type'};
        }
    } catch (err) {
        console.error('Error updating member type:', err);
        return { success: false, message: 'Error updating member type'};
    }
};
// Delete member type

const deleteMemberType = async (id) => {
try{
    const response = await axios.delete(`${API_BASE_URL}/member-type-setup/${id}/`);
    if(response.status === 204){
        await fetchMemberTypes();
        return { success: true, message: 'Member Type deleted successfully'};
    } else{
        return {success: false, message: 'Failed to delete member type'};
    }
} catch(err){
    console.error('Error deleting member type:', err);
    return { success: false, message: 'Error deleting member type'};
}
};

return{
    memberTypes,
    loading,
    error,
    addMemberType,
    editMemberType,
    deleteMemberType,
    fetchMemberTypes,
};
};

export default useMemberType;