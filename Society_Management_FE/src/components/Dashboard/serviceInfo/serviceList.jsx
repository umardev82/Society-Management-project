import React, { useState } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import useService from '../../../hooks/useService';
import Modal from '../modal';

const ServiceList = () => {
  const { services, deleteService, editService, loading, error } = useService();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [editServiceName, setEditServiceName] = useState('');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading services: {error.message}</div>;
  }

  const handleOpenEditModal = (service) => {
    setSelectedService(service);
    setEditServiceName(service.service_name);
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (service) => {
    setSelectedService(service);
    setIsDeleteModalOpen(true);
  };

  const handleOpenViewModal = (service) => {
    setSelectedService(service);
    setIsViewModalOpen(true);
  };

  const handleEditService = () => {
    if (selectedService) {
      editService(selectedService.service_id, editServiceName);
      setIsEditModalOpen(false);
    }
  };

  const handleDeleteService = () => {
    if (selectedService) {
      deleteService(selectedService.service_id);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="py-5">
      <table className="min-w-full text-sm text-gray-600 bg-white border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border text-start px-4 py-2">#</th>
            <th className="border text-start px-4 py-2">Service Name</th>
            <th className="border text-start px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={service.id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{service.service_name}</td>
              <td className="border px-4 py-2" colSpan={1}>
                <div className="relative group">
                  <div className="">
                    <ul className="flex gap-2 text-left">
                      <li
                        className=" text-green-700 cursor-pointer"
                        onClick={() => handleOpenViewModal(service)}
                      >
                        <FaEye />
                      </li>
                      <li
                        className=" text-yellow-600 cursor-pointer"
                        onClick={() => handleOpenEditModal(service)}
                      >
                        <FaEdit />
                      </li>
                      <li
                        className="text-red-700  cursor-pointer"
                        onClick={() => handleOpenDeleteModal(service)}
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

      {/* View Service Modal */}
      <Modal isVisible={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
        <h2 className="text-xl mb-4">Service Details</h2>
        <p><strong>Service Name:</strong> {selectedService?.service_name}</p>
      </Modal>

      {/* Edit Service Modal */}
      <Modal isVisible={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h2 className="text-xl mb-4">Edit Service</h2>
        <input
          type="text"
          value={editServiceName}
          onChange={(e) => setEditServiceName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-sm"
        />
        <button
          onClick={handleEditService}
          className="mt-4 w-auto bg-green-700 text-white px-5 py-2 rounded-sm hover:bg-green-600 transition-colors duration-300"
        >
          Save Changes
        </button>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isVisible={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <h2 className="text-xl mb-4">Confirm Delete</h2>
        <p>Are you sure you want to delete service "{selectedService?.service_name}"?</p>
        <button
          onClick={handleDeleteService}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-sm"
        >
          Yes, Delete
        </button>
      </Modal>
    </div>
  );
};

export default ServiceList;
