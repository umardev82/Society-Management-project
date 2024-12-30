import React, { useState } from 'react'
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import useAmenity from '../../../hooks/useAmenity';
import Modal from '../modal';

const AmenityList = () => {
  const { amenities, deleteAmenity, editAmenity, loading, error } = useAmenity();
  const [isEditModalOpen, setIsEditModalOpen ] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [editAmenityName, setEditAmenityName] = useState('');

  if(loading){
    return <div>Loading...</div>;
  }

  if(error) {
    return <div>Error loading Amenities: {error.message}</div>;
  }

  const handleOpenEditModal =  (amenity) => {
    setSelectedAmenity(amenity);
    setEditAmenityName(amenity.amenity_name);
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (amenity) => {
    setSelectedAmenity(amenity);
    setIsDeleteModalOpen(true);
  };

  const handleOpenViewModal = (amenity) => {
    setSelectedAmenity(amenity);
    setIsViewModalOpen(true);
  };

  const handleEditAmenity = () => {
    if (selectedAmenity) {
      editAmenity( selectedAmenity.amenity_id, editAmenityName);
      setIsEditModalOpen(false);
    }
  };

  const handleDeleteAmenity = () => {
    if (selectedAmenity) {
      deleteAmenity(selectedAmenity.amenity_id);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="py-5">
    <table className="min-w-full text-sm text-gray-600 bg-white border-collapse border border-gray-200">
      <thead>
        <tr>
          <th className="border text-start px-4 py-2">#</th>
          <th className="border text-start px-4 py-2">Amenity Name</th>
          <th className="border text-start px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {amenities.map((amenity, index) => (
          <tr key={amenity.amenity_id}>
            <td className="border px-4 py-2">{index + 1}</td>
            <td className="border px-4 py-2">{amenity.amenity_name}</td>
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
                      onClick={() => handleOpenViewModal(amenity)}
                    >
                      <FaEye />
                    </li>
                    <li
                      className=" text-yellow-600 cursor-pointer"
                      onClick={() => handleOpenEditModal(amenity)}
                    >
                      <FaEdit />
                    </li>
                    <li
                      className="text-red-700  cursor-pointer"
                      onClick={() => handleOpenDeleteModal(amenity)}
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

    {/* View Amnenity Modal */}
    <Modal isVisible={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
      <h2 className="text-xl mb-4">Amnenity Details</h2>
      <p><strong>Amenity Name:</strong> {selectedAmenity?.amenity_name}</p>
    </Modal>

    {/* Edit Amnenity Modal */}
    <Modal isVisible={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
      <h2 className="text-xl mb-4">Edit Amenity</h2>
      <input
        type="text"
        value={editAmenityName}
        onChange={(e) => setEditAmenityName(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-sm"
      />
      <button
        onClick={handleEditAmenity}
        className="mt-4 w-auto bg-green-700 text-white px-5 py-2 rounded-sm hover:bg-green-600 transition-colors duration-300"
      >
        Save Changes
      </button>
    </Modal>

    {/* Delete Confirmation Modal */}
    <Modal isVisible={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
      <h2 className="text-xl mb-4">Confirm Delete</h2>
      <p>Are you sure you want to delete Amnenity "{selectedAmenity?.amenity_name}"?</p>
      <button
        onClick={handleDeleteAmenity}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-sm"
      >
        Yes, Delete
      </button>
    </Modal>
  </div>
  )
}

export default AmenityList;