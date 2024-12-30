import React, { useState } from 'react'
import useMemberType from '../../../hooks/useMemberType';

const AddMemberType = () => {
    const [memberTypeName, setMemberTypeName] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const  {addMemberType} = useMemberType();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {success, message } = await addMemberType(memberTypeName);
        if (success){
            setSuccessMessage(message);
            setMemberTypeName('');
        } else{
          setErrorMessage(message);
        }
    };


  return (
    <>
    <form className='py-5' onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="text"
          id="member_type_name"
          name="member_type_name"
          placeholder="Member Type Name"
          value={memberTypeName}
          onChange={(e) => setMemberTypeName(e.target.value)}
          required
          className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
        />
      </div>
      <button
        type="submit"
        className="w-auto bg-green-700 text-white px-5 py-2 rounded-sm hover:bg-green-600 transition-colors duration-300"
      >
        Add New Member Type
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
  )
}

export default  AddMemberType