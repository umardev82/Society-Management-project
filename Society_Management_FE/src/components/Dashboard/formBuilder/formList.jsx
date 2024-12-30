import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa";

import axios from "axios";

const API_URL = "http://127.0.0.1:8000/form-builder/";

const FormsList = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editFormName, setEditFormName] = useState("");
  const [editFormFields, setEditFormFields] = useState([]);
  const [newFieldLabel, setNewFieldLabel] = useState("");

  // Fetch forms on component mount
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get(API_URL);
        setForms(response.data);
      } catch (err) {
        setError(err.message || "Error fetching forms.");
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  const handleOpenEditModal = (form) => {
    setSelectedForm(form);
    setEditFormName(form.form_name);
    setEditFormFields(form.form_fields || []);
    setIsEditModalOpen(true);
  };

  const handleAddField = () => {
    if (!newFieldLabel.trim()) return;
    setEditFormFields([...editFormFields, { label: newFieldLabel, name: newFieldLabel }]);
    setNewFieldLabel("");
  };

  const handleRemoveField = (index) => {
    setEditFormFields(editFormFields.filter((_, i) => i !== index));
  };

  const handleEditFieldLabel = (index, newLabel) => {
    const updatedFields = [...editFormFields];
    updatedFields[index] = { ...updatedFields[index], label: newLabel, name: newLabel };
    setEditFormFields(updatedFields);
  };

  const handleEditForm = async () => {
    if (selectedForm) {
      try {
        const updatedForm = { form_name: editFormName, form_fields: editFormFields };
        await axios.put(`${API_URL}${selectedForm.id}/`, updatedForm);
        setForms(
          forms.map((form) =>
            form.id === selectedForm.id
              ? { ...form, form_name: editFormName, form_fields: editFormFields }
              : form
          )
        );
        setIsEditModalOpen(false);
      } catch (err) {
        console.error("Error updating form:", err);
      }
    }
  };

  const handleOpenDeleteModal = (form) => {
    setSelectedForm(form);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteForm = async () => {
    if (selectedForm) {
      try {
        await axios.delete(`${API_URL}${selectedForm.id}/`);
        setForms(forms.filter((form) => form.id !== selectedForm.id));
        setIsDeleteModalOpen(false);
      } catch (err) {
        console.error("Error deleting form:", err);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading forms: {error}</div>;
  }

  return (
    <div className="py-5">
      <h1 className="text-xl font-bold mb-5">Forms List</h1>
      <table className="min-w-full text-sm text-gray-600 bg-white border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border text-start px-4 py-2">#</th>
            <th className="border text-start px-4 py-2">Form Name</th>
            <th className="border text-start px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form, index) => (
            <tr key={form.id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{form.form_name}</td>
              <td className="border px-4 py-2">
                <div className="flex gap-2">
                  <button
                    className="text-yellow-600 hover:text-yellow-400"
                    onClick={() => handleOpenEditModal(form)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-700 hover:text-red-500"
                    onClick={() => handleOpenDeleteModal(form)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Form Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-md shadow-md w-full max-w-lg">
            <h2 className="text-xl mb-4">Edit Form</h2>
            <div className="mb-4">
              <label className="block font-medium mb-2">Form Name</label>
              <input
                type="text"
                value={editFormName}
                onChange={(e) => setEditFormName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm"
              />
            </div>
            <div className="mb-4">
              <h3 className="font-medium mb-2">Form Fields</h3>
              <div className="grid gap-2 grid-cols-2">
              {editFormFields.map((field, index) => (
                <div key={index} className=" mb-2">
                    <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={field.label}
                    onChange={(e) => handleEditFieldLabel(index, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm"
                  />
                  <button
                    className="text-red-700"
                    onClick={() => handleRemoveField(index)}
                  >
                    <FaTrash/>
                  </button>
                  </div>
                  
                </div>
              ))}
              </div>
              <div className="flex gap-3 mt-2">
                <input
                  type="text"
                  value={newFieldLabel}
                  onChange={(e) => setNewFieldLabel(e.target.value)}
                  placeholder="New Field Label"
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm"
                />
                <button
                  onClick={handleAddField}
                  className="px-5 py-2 bg-green-700 text-white rounded-sm"
                >
                  <FaPlus/>
                </button>
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-700 text-white rounded-md"
                onClick={handleEditForm}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-md shadow-md w-96">
            <h2 className="text-xl mb-4">Confirm Delete</h2>
            <p>
              Are you sure you want to delete the form "
              <strong>{selectedForm?.form_name}</strong>"?
            </p>
            <div className="mt-4 flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={handleDeleteForm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormsList;
