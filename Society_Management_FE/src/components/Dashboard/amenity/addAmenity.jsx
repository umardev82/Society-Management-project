import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAmenity from '../../../hooks/useAmenity';

const AddAmenity = () => {
  const [amenityName, setAmenityName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { addAmenity } = useAmenity(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { success, message } = await addAmenity(amenityName);

    if (success) {
      // Set the success message
      setSuccessMessage(message);
      setAmenityName('');
      // setTimeout(() => {
      //   navigate('/'); 
      // }, 2000); 
    } else {
      // Set the error message
      setErrorMessage(message);
    }
  };

  return (
    <>
    <form className='py-5' onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="text"
          id="amenity_name"
          name="amenity_name"
          placeholder="Amenity Name"
          value={amenityName}
          onChange={(e) => setAmenityName(e.target.value)}
          required
          className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
        />
      </div>
      <button
        type="submit"
        className="w-auto bg-green-700 text-white px-5 py-2 rounded-sm hover:bg-green-600 transition-colors duration-300"
      >
        Add New Amenity
      </button>
    </form>
     {/* Success Message */}
     {successMessage && (
      <div className="mt-4 text-green-600 text-sm">
        {successMessage}
      </div>
    )}

    {/* Error Message */}
    {errorMessage && (
      <div className="mt-4 text-red-600 text-sm">
        {errorMessage}
      </div>
    )}
    </>
  );
};

export default AddAmenity;
