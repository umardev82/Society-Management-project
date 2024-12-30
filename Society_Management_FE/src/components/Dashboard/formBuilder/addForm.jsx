import React, { useState } from "react";
import axios from "axios";
import { FaPlus, FaTrash } from "react-icons/fa";

const FormBuilder = () => {
  const [formName, setFormName] = useState("");
  const [fields, setFields] = useState([]); // Initial state without a default field
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const API_URL = "http://127.0.0.1:8000/form-builder/";

  // Generate field name from label
  const generateFieldName = (label) => {
    return label
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_") 
      .replace(/_+/g, "_") 
      .replace(/^_+|_+$/g, ""); 
  };

  // Handle adding a new field
  const handleAddField = () => {
    if (!newFieldLabel.trim()) {
      setErrorMessage("Field label cannot be empty.");
      return;
    }

    const fieldName = generateFieldName(newFieldLabel);
    setFields([
      ...fields,
      { label: newFieldLabel, name: fieldName, type: "number", required: true },
    ]);
    setNewFieldLabel(""); // Clear the input
    setErrorMessage(""); // Clear error message
  };

  // Handle removing a field
  const handleRemoveField = (index) => {
    if (fields.length === 1) {
      setErrorMessage("At least one field must be present.");
      return;
    }
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formName.trim()) {
      setErrorMessage("Form name is required.");
      return;
    }

    if (fields.length === 0) {
      setErrorMessage("You must add at least one field.");
      return;
    }

    const formData = {
      form_name: formName,
      form_fields: fields,
    };

    try {
      const response = await axios.post(API_URL, formData);

      if (response.status === 201) {
        setErrorMessage("");
        setSuccessMessage("Form created successfully!");
        // setFormName("");
        // setFields([]);
        
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage =
          error.response.data.form_name?.[0] || "An error occurred.";
          setSuccessMessage("");
        setErrorMessage(errorMessage);
      } else {
        setSuccessMessage("");
        setErrorMessage("Error submitting form. Please try again.");
      }
    }
  };

  return (
    <div className="p-5">
      {/* Form Name Input */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Form Name</label>
        <input
          type="text"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          placeholder="Enter form name"
          className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
          required
        />
      </div>

      {/* Add Field Input */}
      <div className="mb-4 flex items-stretch gap-2">
        <input
          type="text"
          value={newFieldLabel}
          onChange={(e) => setNewFieldLabel(e.target.value)}
          placeholder="Enter field label (e.g., Water Charges)"
          className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
        />
        <button
          type="button"
          onClick={handleAddField}
          className="w-auto bg-green-700 text-white px-5 py-2 rounded-sm hover:bg-green-600 transition-colors duration-300"
        >
          <FaPlus />
        </button>
      </div>

      {/* Fields List */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold mb-3">Fields</h2>
        {fields.length === 0 ? (
          <p className="text-gray-500">No fields added yet.</p>
        ) : (
          <div>
            {fields.map((field, index) => (
              <div key={index} className="mb-2 flex items-center gap-2">
                <input className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700" value={field.label} disabled/>
                <button
                  type="button"
                  onClick={() => handleRemoveField(index)}
                  className="text-red-500 hover:text-red-700 flex items-center gap-1"
                >
                  <FaTrash />
                 
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 text-green-500 text-sm">{successMessage}</div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-auto bg-green-700 text-white px-5 py-2 rounded-sm hover:bg-green-600 transition-colors duration-300"
      >
        Save Form
      </button>
    </div>
  );
};

export default FormBuilder;
