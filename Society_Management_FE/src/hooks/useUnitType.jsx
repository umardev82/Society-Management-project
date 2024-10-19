import axios from "axios";
import { useState, useEffect } from "react";

const useUnitType = () => {
    const [unitTypes, setUnitTypes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Add unit type
    const addUnitType = async (unitName, unitNumber) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/unit_type_info/', {
                unit_name: unitName,
                unit_number: unitNumber,
            });

            if (response.status === 201) {
                setUnitTypes([...unitTypes, response.data]);
                return { success: true, message: 'Unit Type added successfully' };
            } else {
                return { success: false, message: 'Failed to add unit type' };
            }
        } catch (err) {
            console.error('Error adding Unit Type:', err);
    
            // Check if the error response has data and a specific message for `unit_number`
            if (err.response && err.response.status === 400 && err.response.data.unit_number) {
                return { success: false, message: err.response.data.unit_number[0] };
            }
    
            return { success: false, message: 'Error adding unit type' };
        }
    };

    // Fetch unit types
    const fetchUnitTypes = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/unit_type_info/');
            setUnitTypes(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUnitTypes();
    }, []);

    // Edit unit type
    const editUnitType = async (id, updatedUnitName, updatedUnitNumber) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/unit_type_info/${id}/`, {
                unit_name: updatedUnitName,
                unit_number: updatedUnitNumber,
            });

            if (response.status === 200) {
                setUnitTypes(unitTypes.map(unitType => unitType.unit_type_id === id ? response.data : unitType));
                return { success: true, message: 'Unit Type updated successfully' };
            } else {
                return { success: false, message: 'Failed to update unit type' };
            }
        } catch (err) {
            console.error('Error updating unit type:', err);
             // Check if the error response has specific messages
             if (err.response && err.response.status === 400) {
                // You can customize this based on your backend response
                if (err.response.data.unit_name) {
                    return { success: false, message: err.response.data.unit_name[0] };
                }
                if (err.response.data.unit_number) {
                    return { success: false, message: err.response.data.unit_number[0] };
                }
            }
            return { success: false, message: 'Error updating unit type' };
        }
    };

    // Delete unit type
    const deleteUnitType = async (id) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/unit_type_info/${id}/`);

            if (response.status === 204) {
                await fetchUnitTypes();
                return { success: true, message: 'Unit Type deleted successfully' };
            } else {
                return { success: false, message: 'Failed to delete unit type' };
            }
        } catch (err) {
            console.error('Error deleting unit type:', err);
            return { success: false, message: 'Error deleting unit type' };
        }
    };

    return {
        unitTypes,
        loading,
        error,
        addUnitType,
        editUnitType,
        deleteUnitType,
        fetchUnitTypes,
    };
};

export default useUnitType;
