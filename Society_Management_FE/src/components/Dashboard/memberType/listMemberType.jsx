import React,{useState} from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import Modal from '../modal';
import useMemberType from '../../../hooks/useMemberType';

const ListMemberType = () => {
const {memberTypes, deleteMemberType, editMemberType, loading, error} = useMemberType();
const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
const [isViewModalOpen, setIsViewModalOpen] = useState(false);
const [selectedMemberType, setSelectedMemberType] = useState(null);
const [editMemberTypeName, setEditMemberTypeName] = useState('');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading member types: {error.message}</div>;
  }

  const handleOpenEditModal = (memberType) => {
    setSelectedMemberType(memberType);
    setEditMemberTypeName(memberType.member_type_name);
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (memberType) => {
    setSelectedMemberType(memberType);
    setIsDeleteModalOpen(true);
  };

  const handleOpenViewModal = (memberType) => {
    setSelectedMemberType(memberType);
    setIsViewModalOpen(true);
  };

  const handleEditMemberType = () => {
    if (selectedMemberType) {
      editMemberType(selectedMemberType.member_type_id, editMemberTypeName);
      setIsEditModalOpen(false);
    }
  };

  const handleDeleteMemberType = () => {
    if (selectedMemberType) {
      deleteMemberType(selectedMemberType.member_type_id);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="py-5">
    <table className="min-w-full text-sm text-gray-600 bg-white border-collapse border border-gray-200">
      <thead>
        <tr>
          <th className="border text-start px-4 py-2">#</th>
          <th className="border text-start px-4 py-2">Member Type Name</th>
          <th className="border text-start px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {memberTypes.map((memberType, index) => (
          <tr key={memberType.member_type_id}>
            <td className="border px-4 py-2">{index + 1}</td>
            <td className="border px-4 py-2">{memberType.member_type_name}</td>
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
                      onClick={() => handleOpenViewModal(memberType)}
                    >
                      <FaEye />
                    </li>
                    <li
                      className=" text-yellow-600 cursor-pointer"
                      onClick={() => handleOpenEditModal(memberType)}
                    >
                      <FaEdit />
                    </li>
                    <li
                      className="text-red-700  cursor-pointer"
                      onClick={() => handleOpenDeleteModal(memberType)}
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

    {/* View MemberType Modal */}
    <Modal isVisible={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
      <h2 className="text-xl mb-4">Member Type Details</h2>
      <p><strong>Member Type Name:</strong> {selectedMemberType?.member_type_name}</p>
    </Modal>

    {/* Edit MemberType Modal */}
    <Modal isVisible={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
      <h2 className="text-xl mb-4">Edit Member Type</h2>
      <input
        type="text"
        value={editMemberTypeName}
        onChange={(e) => setEditMemberTypeName(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-sm"
      />
      <button
        onClick={handleEditMemberType}
        className="mt-4 w-auto bg-green-700 text-white px-5 py-2 rounded-sm hover:bg-green-600 transition-colors duration-300"
      >
        Save Changes
      </button>
    </Modal>

    {/* Delete Confirmation Modal */}
    <Modal isVisible={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
      <h2 className="text-xl mb-4">Confirm Delete</h2>
      <p>Are you sure you want to delete member type "{selectedMemberType?.member_type_name}"?</p>
      <button
        onClick={handleDeleteMemberType}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-sm"
      >
        Yes, Delete
      </button>
    </Modal>
  </div>
  )
}

export default ListMemberType