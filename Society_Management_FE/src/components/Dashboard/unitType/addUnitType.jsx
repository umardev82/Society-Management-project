import React, { useState } from 'react';
import useUnitType from '../../../hooks/useUnitType';
import { useNavigate } from 'react-router-dom';

const AddUnitType = () => {
  const [unitTypeName, setUnitTypeName] = useState('');
  const [unitNumber, setUnitNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { addUnitType } = useUnitType(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { success, message } = await addUnitType(unitTypeName, unitNumber);


    if (success) {
      // Set the success message
      setSuccessMessage(message);
      setErrorMessage('');

      // Reset the form
      setUnitTypeName('');
      setUnitNumber('');

      // Redirect to unit type list after 2 seconds
    //   setTimeout(() => {
    //     navigate('/all-unit-types'); 
    //   }, 2000);
    } else {
      // Set the error message
      setErrorMessage(message);
      setSuccessMessage('');
    }
  };

  return (
    <>
    <form className='py-5' onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="number"
          id="unit_number"
          name="unit_number"
          placeholder="Unit Number"
          value={unitNumber}
          onChange={(e) => setUnitNumber(e.target.value)}
          required
          className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          id="unit_type_name"
          name="unit_type_name"
          placeholder="Unit Type Name"
          value={unitTypeName}
          onChange={(e) => setUnitTypeName(e.target.value)}
          required
          className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
        />
      </div>
      <button
        type="submit"
        className="w-auto bg-green-700 text-white px-5 py-2 rounded-sm hover:bg-green-600 transition-colors duration-300"
      >
        Add New Unit Type
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

export default AddUnitType;
