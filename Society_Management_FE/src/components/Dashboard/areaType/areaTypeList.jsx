import React, { useState } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import useAreaType from '../../../hooks/useAreaType';
import Modal from '../modal';

const AreaTypeList = () => {
  const { areaTypes, deleteAreaType, editAreaType, loading, error } = useAreaType();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedAreaType, setSelectedAreaType] = useState(null);
  const [editAreaTypeName, setEditAreaTypeName] = useState('');
  const [editAreaValue, setEditAreaValue] = useState('');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading area types: {error.message}</div>;
  }

  const handleOpenEditModal = (areaType) => {
    setSelectedAreaType(areaType);
    setEditAreaTypeName(areaType.area_type_name);
    setEditAreaValue(areaType.area_value);
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (areaType) => {
    setSelectedAreaType(areaType);
    setIsDeleteModalOpen(true);
  };

  const handleOpenViewModal = (areaType) => {
    setSelectedAreaType(areaType);
    setIsViewModalOpen(true);
  };

  const handleEditAreaType = () => {
    if (selectedAreaType) {
      editAreaType(selectedAreaType.area_type_id, editAreaTypeName, editAreaValue);

      setIsEditModalOpen(false);
    }
  };

  const handleDeleteAreaType = () => {
    if (selectedAreaType) {
      deleteAreaType(selectedAreaType.area_type_id);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="py-5">
      <table className="min-w-full text-sm text-gray-600 bg-white border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border text-start px-4 py-2">#</th>
            <th className="border text-start px-4 py-2">Area Type Name</th>
            <th className="border text-start px-4 py-2">Area Value</th>
            <th className="border text-start px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {areaTypes.map((areaType, index) => (
            <tr key={areaType.area_type_id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{areaType.area_type_name}</td>
              <td className="border px-4 py-2">{areaType.area_value}</td>
              <td className="border px-4 py-2" colSpan={1}>
                <div className="relative group">
                  {/* Action Button */}
                  {/* <button className="focus:outline-none">
                    <BsThreeDotsVertical />
                  </button> */}
                  {/* Dropdown Menu */}
                  <div className="">
                    <ul className="flex gap-2 text-left">
                      <li
                        className=" text-green-700 cursor-pointer"
                        onClick={() => handleOpenViewModal(areaType)}
                      >
                        <FaEye />
                      </li>
                      <li
                        className=" text-yellow-600 cursor-pointer"
                        onClick={() => handleOpenEditModal(areaType)}
                      >
                        <FaEdit />
                      </li>
                      <li
                        className="text-red-700  cursor-pointer"
                        onClick={() => handleOpenDeleteModal(areaType)}
                      >
                        <FaTrash /> 
                      </li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Area Type Modal */}
      <Modal isVisible={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
        <h2 className="text-xl mb-4">Area Type Details</h2>
        <p><strong>Area Type Name:</strong> {selectedAreaType?.area_type_name}</p>
        <p><strong>Area Value:</strong> {selectedAreaType?.area_value}</p>
      </Modal>

      {/* Edit Area Type Modal */}
      <Modal isVisible={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h2 className="text-xl mb-4">Edit Area Type</h2>
         <div className="mb-4">
           <select name="area_type_name" value={editAreaTypeName} onChange={(e) => setEditAreaTypeName(e.target.value)}
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
          value={editAreaValue}
          onChange={(e) => setEditAreaValue(e.target.value)}
          required
          className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
        />
      </div>
        <button
          onClick={handleEditAreaType}
          className="mt-4 w-auto bg-green-700 text-white px-5 py-2 rounded-sm hover:bg-green-600 transition-colors duration-300"
        >
          Save Changes
        </button>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isVisible={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <h2 className="text-xl mb-4">Confirm Delete</h2>
        <p>Are you sure you want to delete Area Type "{selectedAreaType?.area_type_name}"?</p>
        <button
          onClick={handleDeleteAreaType}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-sm"
        >
          Yes, Delete
        </button>
      </Modal>
    </div>
  );
};

export default AreaTypeList;
