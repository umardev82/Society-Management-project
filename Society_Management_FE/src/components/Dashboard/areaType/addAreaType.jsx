import React, {useState} from 'react'
import useAreaType from '../../../hooks/useAreaType'


const AddAreaType = () => {
  const [areaTypeName, setAreaTypeName] = useState('');
  const [areaValue, setAreaValue] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { addAreaType } = useAreaType();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {success, message } = await addAreaType (areaTypeName, areaValue);

    if (success) {
      setSuccessMessage(message);
      setAreaTypeName('');
      setAreaValue('');
    } else {
      setErrorMessage(message);
    }
  };
  return (
   <>
     <form className='py-5' onSubmit={handleSubmit}>
      <div className="mb-4">
           <select name="area_type_name" value={areaTypeName} onChange={(e) => setAreaTypeName(e.target.value)}
          required className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700">
            <option value="">Area Type</option>
            <option value="SQFT">Square Feet (SQFT)</option>
            <option value="MARLA">Marla</option>
            <option value="KANAL">Kanal</option>
          </select>
      </div>
      <div className="mb-4">
        <input
          type="number"
          id="area_value"
          name="area_value"
          placeholder="Area Value"
          value={areaValue}
          onChange={(e) => setAreaValue(e.target.value)}
          required
          className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
        />
      </div>
      <button
        type="submit"
        className="w-auto bg-green-700 text-white px-5 py-2 rounded-sm hover:bg-green-600 transition-colors duration-300"
      >
        Add New Area Type
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

export default AddAreaType;