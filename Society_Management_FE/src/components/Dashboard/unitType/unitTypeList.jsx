import React, { useState } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import useUnitType from '../../../hooks/useUnitType';
import Modal from '../modal';

const UnitTypeList = () => {
  const { unitTypes, deleteUnitType, editUnitType, loading, error } = useUnitType();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedUnitType, setSelectedUnitType] = useState(null);
  const [editUnitName, setEditUnitName] = useState('');
  const [editUnitNumber, setEditUnitNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading Unit Types: {error.message}</div>;
  }

  const handleOpenEditModal = (unitType) => {
    setSelectedUnitType(unitType);
    setEditUnitName(unitType.unit_name);
    setEditUnitNumber(unitType.unit_number);
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (unitType) => {
    setSelectedUnitType(unitType);
    setIsDeleteModalOpen(true);
  };

  const handleOpenViewModal = (unitType) => {
    setSelectedUnitType(unitType);
    setIsViewModalOpen(true);
  };

  const handleEditUnitType = () => {
    if (selectedUnitType) {
        // Call the edit function and handle the response
        editUnitType(selectedUnitType.unit_type_id, editUnitName, editUnitNumber)
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

  const handleDeleteUnitType = () => {
    if (selectedUnitType) {
      deleteUnitType(selectedUnitType.unit_type_id);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="py-5">
      <table className="min-w-full text-sm text-gray-600 bg-white border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border text-start px-4 py-2">#</th>
            <th className="border text-start px-4 py-2">Unit Type</th>
            <th className="border text-start px-4 py-2">Unit Number</th>
            <th className="border text-start px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {unitTypes.map((unitType, index) => (
            <tr key={unitType.unit_type_id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{unitType.unit_name}</td>
              <td className="border px-4 py-2">{unitType.unit_number}</td>
              <td className="border px-4 py-2">
                <ul className="flex gap-2 text-left">
                  <li className="text-green-700 cursor-pointer" onClick={() => handleOpenViewModal(unitType)}>
                    <FaEye />
                  </li>
                  <li className="text-yellow-600 cursor-pointer" onClick={() => handleOpenEditModal(unitType)}>
                    <FaEdit />
                  </li>
                  <li className="text-red-700 cursor-pointer" onClick={() => handleOpenDeleteModal(unitType)}>
                    <FaTrash />
                  </li>
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Modal */}
      <Modal isVisible={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
        <h2 className="text-xl mb-4">Unit Type Details</h2>
        <p><strong>Unit Type:</strong> {selectedUnitType?.unit_name}</p>
        <p><strong>Unit Number:</strong> {selectedUnitType?.unit_number}</p>
      </Modal>

      {/* Edit Modal */}
      <Modal isVisible={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h2 className="text-xl mb-4">Edit Unit Type</h2>
        <input
          type="text"
          value={editUnitName}
          onChange={(e) => setEditUnitName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-sm"
          placeholder="Unit Name"
        />
        <input
          type="number"
          value={editUnitNumber}
          onChange={(e) => setEditUnitNumber(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-sm mt-2"
          placeholder="Unit Number"
        />
        <button
          onClick={handleEditUnitType}
          className="mt-4 bg-green-700 text-white px-5 py-2 rounded-sm hover:bg-green-600 transition-colors duration-300"
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

      {/* Delete Confirmation Modal */}
      <Modal isVisible={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <h2 className="text-xl mb-4">Confirm Delete</h2>
        <p>Are you sure you want to delete unit type "{selectedUnitType?.unit_name}"?</p>
        <button
          onClick={handleDeleteUnitType}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-sm"
        >
          Yes, Delete
        </button>
      </Modal>
    </div>
  );
};

export default UnitTypeList;

