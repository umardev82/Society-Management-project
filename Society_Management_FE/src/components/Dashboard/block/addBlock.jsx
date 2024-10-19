import React, { useState } from 'react';
import useBlock from '../../../hooks/useBlock';
import { useNavigate } from 'react-router-dom';

const AddBlock = () => {
  const [blockName, setBlockName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { addBlock } = useBlock(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { success, message } = await addBlock(blockName);

    if (success) {
      // Set the success message
      setSuccessMessage(message);

      // Reset the form
      setBlockName('');

      // Redirect to block list after 2 seconds
      setTimeout(() => {
        navigate('/all-blocks'); // Adjust the path to your block list page
      }, 2000); // 2 seconds delay
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
          id="block_name"
          name="block_name"
          placeholder="Block Name"
          value={blockName}
          onChange={(e) => setBlockName(e.target.value)}
          required
          className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
        />
      </div>
      <button
        type="submit"
        className="w-auto bg-green-700 text-white px-5 py-2 rounded-sm hover:bg-green-600 transition-colors duration-300"
      >
        Add New Block
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

export default AddBlock;
