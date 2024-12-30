import React, { useState } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import usePropertyType from '../../../hooks/usePropertyType';
import Modal from '../modal';

const PropertyTypeList = () => {
    const { propertyTypes, deletePropertyType, editPropertyType, loading, error } = usePropertyType();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedPropertyType, setSelectedPropertyType] = useState(null);
    const [editPropertyName, setEditPropertyName] = useState('');
    // const [editPropertyNumber, setEditPropertyNumber] = useState('');
    // const [editJointNumber, setEditJointNumber] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading Property Types: {error.message}</div>;
    }

    const handleOpenEditModal = (propertyType) => {
        setSelectedPropertyType(propertyType);
        setEditPropertyName(propertyType.property_name);
        // setEditPropertyNumber(propertyType.property_number);
        // setEditJointNumber(propertyType.joint_number);
        setIsEditModalOpen(true);
    };

    const handleOpenDeleteModal = (propertyType) => {
        setSelectedPropertyType(propertyType);
        setIsDeleteModalOpen(true);
    };

    const handleOpenViewModal = (propertyType) => {
        setSelectedPropertyType(propertyType);
        setIsViewModalOpen(true);
    };

    const handleEditPropertyType = () => {
        if (selectedPropertyType) {
            // Call the edit function and handle the response
            editPropertyType(selectedPropertyType.pro_type_id, editPropertyName)
                .then((result) => {
                    // Set success or error message based on result
                    if (result.success) {
                        setSuccessMessage(result.message);
                        setErrorMessage(''); // Clear any previous error message
                    } else {
                        setErrorMessage(result.message);
                        setSuccessMessage(''); // Clear any previous success message
                    }
                    
                    // Close the modal after a delay (e.g., 2 seconds)
                    setTimeout(() => {
                        setIsEditModalOpen(false); // Close the modal
                        setSuccessMessage(''); // Clear success message after closing
                        setErrorMessage(''); // Clear error message after closing
                    }, 2000); // 2000 milliseconds = 2 seconds
                });
        }
    };

    const handleDeletePropertyType = () => {
        if (selectedPropertyType) {
            deletePropertyType(selectedPropertyType.pro_type_id);
            setIsDeleteModalOpen(false);
        }
    };

    return (
        <div className="py-5">
            <table className="min-w-full text-sm text-gray-600 bg-white border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border text-start px-4 py-2">#</th>
                        <th className="border text-start px-4 py-2">Property Type</th>
                        {/* <th className="border text-start px-4 py-2">Property Number</th>
                        <th className="border text-start px-4 py-2">Joint Number</th> */}
                        <th className="border text-start px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {propertyTypes.map((propertyType, index) => (
                        <tr key={propertyType.pro_type_id}>
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{propertyType.property_name}</td>
                            {/* <td className="border px-4 py-2">{propertyType.property_number}</td>
                            <td className="border px-4 py-2">{propertyType.joint_number}</td> */}
                            <td className="border px-4 py-2">
                                <ul className="flex gap-2 text-left">
                                    <li className="text-green-700 cursor-pointer" onClick={() => handleOpenViewModal(propertyType)}>
                                        <FaEye />
                                    </li>
                                    <li className="text-yellow-600 cursor-pointer" onClick={() => handleOpenEditModal(propertyType)}>
                                        <FaEdit />
                                    </li>
                                    <li className="text-red-700 cursor-pointer" onClick={() => handleOpenDeleteModal(propertyType)}>
                                        <FaTrash />
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Modal */}
            
                <Modal isVisible={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} >
                <h2 className="text-xl mb-4">Edit Property Type</h2>
                    <input
                        type="text"
                        value={editPropertyName}
                        onChange={(e) => setEditPropertyName(e.target.value)}
                        placeholder="Property Type Name"
                         className="w-full px-4 py-2 border border-gray-300 rounded-sm"
                    />
                    {/* <input
                        type="number"
                        value={editPropertyNumber}
                        onChange={(e) => setEditPropertyNumber(e.target.value)}
                        placeholder="Property Number"
                         className="w-full px-4 py-2 border border-gray-300 rounded-sm mt-2"
                    />
                    <input type="number"
                           value={editJointNumber}
                           onChange={(e) => setEditJointNumber(e.target.value)}
                           placeholder="Joint Number"
                           className='w-full px-4 py-2 border border-gray-300 rounded-sm mt-2'
                    /> */}
                     <button
        onClick={handleEditPropertyType}
        className="mt-4 w-auto bg-green-700 text-white px-5 py-2 rounded-sm hover:bg-green-600 transition-colors duration-300"
      >
        Save Changes
      </button>
       {/* Display Success or Error Message */}
       {successMessage && (
                    <div className="mt-2 text-green-700">
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="mt-2 text-red-700">
                        {errorMessage}
                    </div>
                )}
                </Modal>
         

            {/* Delete Modal */}
           
                <Modal isVisible={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} >
                                       <h2 className="text-xl mb-4">Confirm Delete</h2>
      <p>Are you sure you want to delete Property Type "{selectedPropertyType?.property_name}"?</p>
      <button
        onClick={handleDeletePropertyType}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-sm"
      >
        Yes, Delete
      </button>
                </Modal>
         

            {/* View Modal */}
            
                <Modal isVisible={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
                <h2 className="text-xl mb-4">Property Type Details</h2>
                <p><strong>Property Type Name:</strong> {selectedPropertyType?.property_name}</p>
                {/* <p><strong>Property Number: </strong> {selectedPropertyType?.property_number}</p>
                <p><strong>Joint Number: </strong> Joint: {selectedPropertyType?.joint_number}</p> */}
                   
                </Modal>
           
        </div>
    );
};

export default PropertyTypeList;
