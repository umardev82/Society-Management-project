import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from "../config";

const useBlock = () => {
  const [blocks, setBlocks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch blocks (GET)
  const fetchBlocks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/block_info/`);
      setBlocks(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlocks();
  }, []);

  // Add block (POST)
  const addBlock = async (blockName) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/block_info/`, {
        block_name: blockName,
      });

      if (response.status === 201) {
        // Update the block list with the new block
        setBlocks([...blocks, response.data]);
        return { success: true, message: 'Block added successfully' };
      } else {
        return { success: false, message: 'Failed to add block' };
      }
    } catch (err) {
      console.error('Error adding block:', err);
      return { success: false, message: 'Error adding block' };
    }
  };

  // Edit block (PUT/PATCH)
  const editBlock = async (id, updatedBlockName) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/block_info/${id}/`, {
        block_name: updatedBlockName,
      });

      if (response.status === 200) {
        // Update block list with edited block
        setBlocks(blocks.map(block => block.id === id ? response.data : block));
        return { success: true, message: 'Block updated successfully' };
      } else {
        return { success: false, message: 'Failed to update block' };
      }
    } catch (err) {
      console.error('Error updating block:', err);
      return { success: false, message: 'Error updating block' };
    }
  };

  // Delete block (DELETE)
  const deleteBlock = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/block_info/${id}/`);

      if (response.status === 204) {
        // Fetch the updated block list after deletion
        await fetchBlocks();
        return { success: true, message: 'Block deleted successfully' };
      } else {
        return { success: false, message: 'Failed to delete block' };
      }
    } catch (err) {
      console.error('Error deleting block:', err);
      return { success: false, message: 'Error deleting block' };
    }
  };

  return {
    blocks,
    loading,
    error,
    addBlock,
    editBlock,
    deleteBlock,
    fetchBlocks,
  };
};

export default useBlock;
