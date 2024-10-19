import React, { useState } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import useBlock from '../../../hooks/useBlock';
import Modal from '../modal';

const BlockList = () => {
  const { blocks, deleteBlock, editBlock, loading, error } = useBlock();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [editBlockName, setEditBlockName] = useState('');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading blocks: {error.message}</div>;
  }

  const handleOpenEditModal = (block) => {
    setSelectedBlock(block);
    setEditBlockName(block.block_name);
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (block) => {
    setSelectedBlock(block);
    setIsDeleteModalOpen(true);
  };

  const handleOpenViewModal = (block) => {
    setSelectedBlock(block);
    setIsViewModalOpen(true);
  };

  const handleEditBlock = () => {
    if (selectedBlock) {
      editBlock(selectedBlock.id, editBlockName);
      setIsEditModalOpen(false);
    }
  };

  const handleDeleteBlock = () => {
    if (selectedBlock) {
      deleteBlock(selectedBlock.id);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="py-5">
      <table className="min-w-full text-sm text-gray-600 bg-white border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border text-start px-4 py-2">#</th>
            <th className="border text-start px-4 py-2">Block Name</th>
            <th className="border text-start px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((block, index) => (
            <tr key={block.id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{block.block_name}</td>
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
                        onClick={() => handleOpenViewModal(block)}
                      >
                        <FaEye />
                      </li>
                      <li
                        className=" text-yellow-600 cursor-pointer"
                        onClick={() => handleOpenEditModal(block)}
                      >
                        <FaEdit />
                      </li>
                      <li
                        className="text-red-700  cursor-pointer"
                        onClick={() => handleOpenDeleteModal(block)}
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

      {/* View Block Modal */}
      <Modal isVisible={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
        <h2 className="text-xl mb-4">Block Details</h2>
        <p><strong>Block Name:</strong> {selectedBlock?.block_name}</p>
      </Modal>

      {/* Edit Block Modal */}
      <Modal isVisible={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h2 className="text-xl mb-4">Edit Block</h2>
        <input
          type="text"
          value={editBlockName}
          onChange={(e) => setEditBlockName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-sm"
        />
        <button
          onClick={handleEditBlock}
          className="mt-4 w-auto bg-green-700 text-white px-5 py-2 rounded-sm hover:bg-green-600 transition-colors duration-300"
        >
          Save Changes
        </button>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isVisible={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <h2 className="text-xl mb-4">Confirm Delete</h2>
        <p>Are you sure you want to delete block "{selectedBlock?.block_name}"?</p>
        <button
          onClick={handleDeleteBlock}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-sm"
        >
          Yes, Delete
        </button>
      </Modal>
    </div>
  );
};

export default BlockList;
