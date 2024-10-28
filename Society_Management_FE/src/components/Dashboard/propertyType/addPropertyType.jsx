import React, { useState } from 'react';
import usePropertyType from '../../../hooks/usePropertyType';
import { useNavigate } from 'react-router-dom';

const AddPropertyType = () => {
    const [propertyTypeName, setPropertyTypeName] = useState('');
    const [propertyNumber, setPropertyNumber] = useState('');
    const [jointNumber, setJointNumber] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { addPropertyType } = usePropertyType(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { success, message } = await addPropertyType(propertyTypeName, propertyNumber, jointNumber);

        if (success) {
            setSuccessMessage(message);
            setErrorMessage('');

            setPropertyTypeName('');
            setPropertyNumber('');
            setJointNumber('');
        } else {
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
                        id="property_number"
                        name="property_number"
                        placeholder="Property Number"
                        value={propertyNumber}
                        onChange={(e) => setPropertyNumber(e.target.value)}
                        required
                        className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
                    />
                </div>
                <div className='mb-4'>
                <input
                        type="number"
                        id="joint_number"
                        name="joint_number"
                        placeholder="Joint Number"
                        value={jointNumber}
                        onChange={(e) => setJointNumber(e.target.value)}
                        required
                        className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        id="property_type_name"
                        name="property_type_name"
                        placeholder="Property Type Name"
                        value={propertyTypeName}
                        onChange={(e) => setPropertyTypeName(e.target.value)}
                        required
                        className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
                    />
                </div>
                <button
                    type="submit"
                    className="w-auto bg-green-700 text-white px-5 py-2 rounded-sm hover:bg-green-600 transition-colors duration-300"
                >
                    Add New Property Type
                </button>
            </form>
            {successMessage && (
                <div className="mt-4 text-green-600 text-sm">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="mt-4 text-red-600 text-sm">
                    {errorMessage}
                </div>
            )}
        </>
    );
};

export default AddPropertyType;
