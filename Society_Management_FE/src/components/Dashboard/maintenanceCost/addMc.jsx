import React, { useState } from 'react'
import useMaintainanceCost from '../../../hooks/useMaintainanceCost'
const AddMc = () => {
  const {addMaintenanceCost} = useMaintainanceCost();
  const[mcTitle, setMcTitle] = useState('');
  const[mcDate, setMcDate] = useState('');
  const[mcAmount, setMcAmount] = useState('');
  const[mcDetails, setMcDetails] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const {success, message } = await addMaintenanceCost(mcTitle, mcDate, mcAmount, mcDetails);
    if (success){
      setSuccessMessage(message);
      setMcTitle('');
      setMcDate('');
      setMcAmount('');
      setMcDetails('');
  } else{
    setErrorMessage(message);
  }
  };
  return (
    <>
    <form className='py-5' onSubmit={handleSubmit}>
      <div className="mb-4 grid md:grid-cols-2 grid-cols-1 gap-4">
        <input
          type="text"
          id="m_title"
          name="m_title"
          placeholder="Maintenance Cost Title"
          value={mcTitle}
          onChange={(e) => setMcTitle(e.target.value)}
          required
          className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
        />
          <input
          type="date"
          id="m_date"
          name="m_date"
          placeholder="Maintenance Cost Date"
          value={mcDate}
          onChange={(e) => setMcDate(e.target.value)}
          required
          className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
        />
          <input
          type="number"
          id="m_amount"
          name="m_amount"
          placeholder="Maintenance Cost Amount"
          value={mcAmount}
          onChange={(e) => setMcAmount(e.target.value)}
          required
          className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
        />
          <textarea
          rows={1}
          id="m_details"
          name="m_details"
          placeholder="Maintenance Cost Details"
          value={mcDetails}
          onChange={(e) => setMcDetails(e.target.value)}
          required
          className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
        />
      </div>
      <button
        type="submit"
        className="w-auto bg-green-700 text-white px-5 py-2 rounded-sm hover:bg-green-600 transition-colors duration-300"
      >
        Add New Maintenance Cost
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

export default  AddMc