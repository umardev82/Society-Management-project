import React, { useState } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import Modal from '../modal';
import useMaintainanceCost from '../../../hooks/useMaintainanceCost';

const McList = () => {
  const {
    maintenanceCost,
    loading,
    error,
    editMaintenanceCost,
    deleteMaintenanceCost,
  } = useMaintainanceCost();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedMaintenanceCost, setSelectedMaintenanceCost] = useState(null);
  const [editMaintenanceTitle, setEditMaintenanceTitle] = useState('');
  const [editMaintenanceAmount, setEditMaintenanceAmount] = useState('');
  const [editMaintenanceDate, setEditMaintenanceDate] = useState('');
  const [editMaintenanceDetails, setEditMaintenanceDetails] = useState('');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading maintenance costs: {error.message}</div>;
  }

  const handleOpenEditModal = (maintenance) => {
    setSelectedMaintenanceCost(maintenance);
    setEditMaintenanceTitle(maintenance.m_title);
    setEditMaintenanceAmount(maintenance.m_amount);
    setEditMaintenanceDate(maintenance.m_date);
    setEditMaintenanceDetails(maintenance.m_details);
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (maintenance) => {
    setSelectedMaintenanceCost(maintenance);
    setIsDeleteModalOpen(true);
  };

  const handleOpenViewModal = (maintenance) => {
    setSelectedMaintenanceCost(maintenance);
    setIsViewModalOpen(true);
  };

  const handleEditMaintenanceCost = () => {
    if (selectedMaintenanceCost) {
      editMaintenanceCost(
        selectedMaintenanceCost.m_id, // Pass the correct ID
        editMaintenanceTitle,        // Pass updated title
        editMaintenanceDate,         // Pass updated date
        editMaintenanceAmount,       // Pass updated amount
        editMaintenanceDetails       // Pass updated details
      ).then((response) => { // **Marked Change: Handling success/error response**
        if (response.success) {
          alert(response.message);
        } else {
          alert(response.message);
        }
      });
      setIsEditModalOpen(false); // Close the modal
    }
  };
  

  const handleDeleteMaintenanceCost = () => {
    if (selectedMaintenanceCost) {
      deleteMaintenanceCost(selectedMaintenanceCost.m_id);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="py-5">
      <table className="min-w-full text-sm text-gray-600 bg-white border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border text-start px-4 py-2">#</th>
            <th className="border text-start px-4 py-2">Maintenance Title</th>
            <th className="border text-start px-4 py-2">Maintenance Date</th>
            <th className="border text-start px-4 py-2">Maintenance Amount</th>
            <th className="border text-start px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {maintenanceCost.map((maintenance, index) => (
            <tr key={maintenance.m_id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{maintenance.m_title}</td>
              <td className="border px-4 py-2">{maintenance.m_date}</td>
              <td className="border px-4 py-2">{maintenance.m_amount}</td>
              <td className="border px-4 py-2">
                <div className="flex gap-2">
                  <FaEye
                    className="text-green-700 cursor-pointer"
                    onClick={() => handleOpenViewModal(maintenance)}
                  />
                  <FaEdit
                    className="text-yellow-600 cursor-pointer"
                    onClick={() => handleOpenEditModal(maintenance)}
                  />
                  <FaTrash
                    className="text-red-700 cursor-pointer"
                    onClick={() => handleOpenDeleteModal(maintenance)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Maintenance Modal */}
      <Modal isVisible={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
        <h2 className="text-xl mb-4">Maintenance Cost Details</h2>
        <p><strong>Title:</strong> {selectedMaintenanceCost?.m_title}</p>
        <p><strong>Date:</strong> {selectedMaintenanceCost?.m_date}</p>
        <p><strong>Amount:</strong> {selectedMaintenanceCost?.m_amount}</p>
        <p><strong>Details:</strong> {selectedMaintenanceCost?.m_details}</p>
      </Modal>

      {/* Edit Maintenance Modal */}
      <Modal isVisible={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h2 className="text-xl mb-4">Edit Maintenance Cost</h2>
        <input
          type="text"
          value={editMaintenanceTitle}
          onChange={(e) => setEditMaintenanceTitle(e.target.value)}
          placeholder="Title"
          className="w-full px-4 py-2 border border-gray-300 rounded-sm mb-2"
        />
        <input
          type="number"
          value={editMaintenanceAmount}
          onChange={(e) => setEditMaintenanceAmount(e.target.value)}
          placeholder="Amount"
          className="w-full px-4 py-2 border border-gray-300 rounded-sm mb-2"
        />
        <input
          type="date"
          value={editMaintenanceDate}
          onChange={(e) => setEditMaintenanceDate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-sm mb-2"
        />
          <textarea
          value={editMaintenanceDetails}
          onChange={(e) => setEditMaintenanceDetails(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-sm"
        />
        <button
          onClick={handleEditMaintenanceCost}
          className="mt-4 bg-green-700 text-white px-5 py-2 rounded-sm hover:bg-green-600 transition-colors duration-300"
        >
          Save Changes
        </button>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isVisible={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <h2 className="text-xl mb-4">Confirm Delete</h2>
        <p>Are you sure you want to delete maintenance cost "{selectedMaintenanceCost?.m_title}"?</p>
        <button
          onClick={handleDeleteMaintenanceCost}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-sm"
        >
          Yes, Delete
        </button>
      </Modal>
    </div>
  );
};

export default McList;
