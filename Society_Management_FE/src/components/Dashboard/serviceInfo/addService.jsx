import React, { useState } from 'react';
import useService from '../../../hooks/useService';
import { useNavigate } from 'react-router-dom';

const AddService = () => {
  const [serviceName, setServiceName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { addService } = useService(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { success, message } = await addService(serviceName);

    if (success) {
      setSuccessMessage(message);    
      setServiceName('');
    } else {
      setErrorMessage(message);
    }
  };

  return (
    <>
    <form className='py-5' onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="text"
          id="service_name"
          name="service_name"
          placeholder="Service Name"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          required
          className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
        />
      </div>
      <button
        type="submit"
        className="w-auto bg-green-700 text-white px-5 py-2 rounded-sm hover:bg-green-600 transition-colors duration-300"
      >
        Add New Service
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

export default AddService;
