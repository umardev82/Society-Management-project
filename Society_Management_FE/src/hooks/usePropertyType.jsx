import axios from "axios";
import { useState, useEffect } from "react";

const usePropertyType = () => {
    const [propertyTypes, setPropertyTypes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Add property type
    const addPropertyType = async (propertyName, propertyNumber, jointNumber) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/property_type_info/', {
                property_name: propertyName,
                property_number: propertyNumber,
                joint_number:jointNumber,
            });
    
            // Check for both 200 and 201 status codes
            if (response.status === 200 || response.status === 201) {
                setPropertyTypes(prevPropertyTypes => [...prevPropertyTypes, response.data]);
                return { success: true, message: 'Property Type added successfully' };
            } else {
                return { success: false, message: 'Failed to add property type' };
            }
        } 
        catch (err) {
            console.error('Error adding Property Type:', err);
        
            if (err.response && err.response.status === 400 && err.response.data.property_number) {
                return { success: false, message: err.response.data.property_number[0] };
            }
    
            return { success: false, message: 'Error adding Property type' };
        }
    };
    
    // Fetch property types
    const fetchPropertyTypes = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/property_type_info/');
            setPropertyTypes(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPropertyTypes();
    }, []);

    // edit property type

    const editPropertyType = async (id, updatedPropertyName, updatedPropertyNumber, updatedJointNumber) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/property_type_info/${id}/`, {
                property_name: updatedPropertyName,
                property_number: updatedPropertyNumber,
                joint_number: updatedJointNumber,
            });
    
            // Check for a successful response
            if (response.status === 200) {
                // Update the state with the modified property type
                setPropertyTypes(prevPropertyTypes => 
                    prevPropertyTypes.map(propertyType => 
                        propertyType.pro_type_id === id ? response.data : propertyType
                    )
                );
                return { success: true, message: 'Property Type updated successfully' };
            } else {
                return { success: false, message: 'Failed to update property type' };
            }
        } catch (err) {
            console.error('Error updating property type:', err);
    
            // Check if the error response has specific messages
            if (err.response && err.response.status === 400) {
                // You can customize this based on your backend response
                if (err.response.data.property_name) {
                    return { success: false, message: err.response.data.property_name[0] };
                }
                if (err.response.data.property_number) {
                    return { success: false, message: err.response.data.property_number[0] };
                }
            }
    
            return { success: false, message: 'Error updating property type' };
        }
    };
    

    // Delete property type
    const deletePropertyType = async (id) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/property_type_info/${id}/`);

            if (response.status === 204) {
                await fetchPropertyTypes();
                return { success: true, message: 'Property Type deleted successfully' };
            } else {
                return { success: false, message: 'Failed to delete property type' };
            }
        } catch (err) {
            console.error('Error deleting property type:', err);
            return { success: false, message: 'Error deleting property type' };
        }
    };

    return {
        propertyTypes,
        loading,
        error,
        addPropertyType,
        editPropertyType,
        deletePropertyType,
        fetchPropertyTypes,
    };
};

export default usePropertyType;
