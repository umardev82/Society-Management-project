import axios from "axios";
import { useState, useEffect } from 'react';

const useAmenity = () => {
    const [amenities, setAmenities] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    //add amenity
    const addAmenity = async (amenityName) => {
        try{
            const response = await axios.post('http://127.0.0.1:8000/amenity_info/' , { 
                amenity_name: amenityName,
            });

            if(response.status === 201){
                setAmenities([...amenities, response.data]);
                return { success: true, message: 'Amenity added successfuly'};
            }else{
                return{ success: false, message: 'Failed to add amenity'};
            }
        } catch (err) {
            console.error('Error adding Amenity:', err);
            return { success:false, message: 'Error adding Amenity'};
        }
    };


 //get amenities
    const fetchAmenities = async () => {
      try{
        const response = await axios.get('http://127.0.0.1:8000/amenity_info/');
        setAmenities(response.data);
        }
        catch (err) {
            setError(err);
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAmenities();
    }, []);

    //edit amenities
    const editAmenity = async (id, updateAmenityName) => {
       try{
        const response = await axios.put(`http://127.0.0.1:8000/amenity_info/${id}/`,{
            amenity_name: updateAmenityName,
        });

        if(response.status === 200){
            setAmenities(amenities.map(amenity => amenity.amenity_id === id ? response.data : amenity));
            return {success: true, message: 'Amenity updated successfully'};
        } else{
            return {success: false, message: 'Failed to update amenity'};
        }
       } catch(err){
        console.error('Error updating amenity:', err);
        return{
            success: false, message: 'Error updating amenity'
        };
       }
    };

    //Delete Amenity
    const deleteAmenity = async (id) => {
      try{
        const response = await axios.delete(`http://127.0.0.1:8000/amenity_info/${id}/`);

        if(response.status === 204) {
            await fetchAmenities();
            return { sucess:true, message: 'Amenity deleted Sucessfully'};
        } else{
            return { success: false, message: 'Failed to delete amenity'};
        }
      } catch(err) {
        console.error('Error deletinf amenity:', err);
        return{ success: false, message: 'Error deleting amenity'};
      }
    };

    return{
        amenities,
        loading,
        error,
        addAmenity,
        editAmenity,
        deleteAmenity,
        fetchAmenities,

    };
};

export default useAmenity; 