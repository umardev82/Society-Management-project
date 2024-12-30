import React, { useState, useEffect } from 'react';
import useManagementCommittee from '../../../hooks/useManagementCommittee';
import Modal from '../modal';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const ManagementCommitteeList = () => {
  const {
    managementCommittee,
    addManagementCommittee,
    deleteManagementCommittee,
    editManagementCommittee,
    fetchManagementCommittee,
    loading,
    error,
  } = useManagementCommittee();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedManagementCommittee, setSelectedManagementCommittee] = useState(null);
  const [editManagementCommitteeData, setEditManagementCommitteeData] = useState({});

  useEffect(() => {
    fetchManagementCommittee();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading management committee: {error.message}</div>;
  }

  const handleOpenEditModal = (mc) => {
    setSelectedManagementCommittee(mc);
    setEditManagementCommitteeData({
      mc_name: mc.mc_name,
      mc_member_type: mc.mc_member_type,
      mc_guardian_type: mc.mc_guardian_type,
      mc_guardian_name: mc.mc_guardian_name,
      mc_email: mc.mc_email,
      mc_contact: mc.mc_contact,
      mc_pre_address: mc.mc_pre_address,
      mc_per_address: mc.mc_per_address,
      mc_cnic: mc.mc_cnic,
      mc_joining_date: mc.mc_joining_date,
      mc_ending_date: mc.mc_ending_date,
      mc_status: mc.mc_status,
      mc_password: mc.mc_password,
    });
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (mc) => {
    setSelectedManagementCommittee(mc);
    setIsDeleteModalOpen(true);
  };

  const handleOpenViewModal = (mc) => {
    setSelectedManagementCommittee(mc);
    setIsViewModalOpen(true);
  };

  const handleEditManagementCommittee = () => {
    if (selectedManagementCommittee) {
      editManagementCommittee(selectedManagementCommittee.mc_id, editManagementCommitteeData)
        .then(() => {
          fetchManagementCommittee();
          setIsEditModalOpen(false);
        })
        .catch((error) => {
          console.error("Error editing management committee:", error);
        });
    }
  };

  const handleDeleteManagementCommittee = () => {
    if (selectedManagementCommittee) {
      deleteManagementCommittee(selectedManagementCommittee.mc_id);
      setIsDeleteModalOpen(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditManagementCommitteeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className='py-5 overflow-x-scroll'>
      <table className='text-sm text-gray-600 bg-white border-collapse border border-gray-200'>
        <thead>
          <tr>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">#</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">Member Type</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">Name</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">Guardian Name</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">Guardian Type</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">Email</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">Contact</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">CNIC</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">Joining Date</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">Ending Date</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">Status</th>
            <th className="border text-start px-4 whitespace-nowrap py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {managementCommittee.map((mc, index) => (
            <tr key={mc.mc_id}>
              <td className="border px-4 whitespace-nowrap py-2 ">{index + 1}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{mc.mc_member_type?.member_type_name}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{mc.mc_name}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{mc.mc_guardian_name}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{mc.mc_guardian_type}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{mc.mc_email}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{mc.mc_contact}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{mc.mc_cnic}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{mc.mc_joining_date}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{mc.mc_ending_date}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{mc.mc_status ? 'Active' : 'Inactive'}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">
                <button className='text-green-700 px-1' onClick={() => handleOpenViewModal(mc)}><FaEye /></button>
                <button className='text-yellow-600 px-1' onClick={() => handleOpenEditModal(mc)}><FaEdit /></button>
                <button className='text-red-700 px-1' onClick={() => handleOpenDeleteModal(mc)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      <Modal isVisible={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h2 className="text-xl mb-4">Edit Management Committee Member</h2>
        <form>
          <div className='mb-4'>
            <input
              type='text'
              name='mc_name'
              placeholder='Name'
              value={editManagementCommitteeData.mc_name}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm"
            />
          </div>
          {/* Add other fields here */}
          <button
            type="button"
            className="w-auto mt-2 bg-green-700 text-white px-5 py-2 rounded-sm"
            onClick={handleEditManagementCommittee}
          >
            Save
          </button>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal isVisible={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <h2 className="text-xl mb-4">Delete Management Committee Member</h2>
        <p>Are you sure you want to delete {selectedManagementCommittee?.mc_name}?</p>
        <button
          type="button"
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-sm"
          onClick={handleDeleteManagementCommittee}
        >
          Yes, Delete
        </button>
      </Modal>

      {/* View Modal */}
      <Modal isVisible={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
        <h2 className="text-xl mb-4">View Management Committee Member</h2>
        <p><strong>Member Type:</strong> {selectedManagementCommittee?.mc_member_type?.member_type_name}</p>
        <p><strong>Member Type:</strong> {selectedManagementCommittee?.mc_name}</p>
        <p><strong>Member Type:</strong> {selectedManagementCommittee?.mc_guardian_type}</p>
        <p><strong>Member Type:</strong> {selectedManagementCommittee?.mc_guardian_name}</p>
        <p><strong>Member Type:</strong> {selectedManagementCommittee?.mc_email}</p>
        <p><strong>Member Type:</strong> {selectedManagementCommittee?.mc_contact}</p>
        <p><strong>Member Type:</strong> {selectedManagementCommittee?.mc_pre_address}</p>
        <p><strong>Member Type:</strong> {selectedManagementCommittee?.mc_per_address}</p>
        <p><strong>Name:</strong> {selectedManagementCommittee?.mc_cnic}</p>
        <p><strong>Guardian Name:</strong> {selectedManagementCommittee?.mc_joining_date}</p>
        <p><strong>Email:</strong> {selectedManagementCommittee?.mc_email}</p>
        <p><strong>Contact:</strong> {selectedManagementCommittee?.mc_contact}</p>
        <p><strong>CNIC:</strong> {selectedManagementCommittee?.mc_cnic}</p>
      </Modal>
    </div>
  );
};

export default ManagementCommitteeList;
