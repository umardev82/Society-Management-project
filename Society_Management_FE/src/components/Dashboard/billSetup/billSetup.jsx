import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCirclePlus } from "react-icons/fa6";
import useAreaType from '../../../hooks/useAreaType';
import usePropertyType from '../../../hooks/usePropertyType';
import useProperty from '../../../hooks/useProperty';

const BillSetupForm = () => {
  const [formData, setFormData] = useState({
    property_type_id: '',
    property_area_id: '',
    property_number_id: '',
  });

  const { propertyTypes, fetchPropertyTypes } = usePropertyType();
  const { areaTypes, fetchAreaTypes } = useAreaType();
  const { properties, fetchProperties } = useProperty();

  const [forms, setForms] = useState([]);
  const [selectedFormId, setSelectedFormId] = useState('');
  const [formFields, setFormFields] = useState([]);
  const [fieldValues, setFieldValues] = useState({});

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchPropertyTypes();
    fetchProperties();
    fetchAreaTypes();
    fetchForms();
  }, []);

  useEffect(() => {
    fetchBillSetupData();
  }, [formData.property_type_id, formData.property_area_id]); // Trigger on property_type or property_area change
  
  

  const fetchForms = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/form-builder');
      setForms(response.data);

      if (response.data.length > 0) {
        const firstFormId = response.data[0].id;
        setSelectedFormId(firstFormId);
        fetchFormFields(firstFormId);
      }
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  };

  const fetchFormFields = async (formId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/form-builder/${formId}`);
      setFormFields(response.data.form_fields || []);
    } catch (error) {
      console.error('Error fetching form fields:', error);
      setFormFields([]);
    }
  };

  const fetchBillSetupData = async () => {
    const { property_type_id, property_area_id, property_number_id } = formData;
  
    // If either property_type_id or property_area_id is empty, reset the fields
    if (!property_type_id || !property_area_id) {
      const resetFieldValues = formFields.reduce((acc, field) => {
        acc[field.name] = '0'; // Default value is 0
        return acc;
      }, {});
      setFieldValues(resetFieldValues);
      return; // Stop further execution
    }
  
    try {
      const response = await axios.get('http://127.0.0.1:8000/bills-setup/', {
        params: {
          property_type_name: property_type_id,
          property_area: property_area_id,
          property_number: property_number_id || null,
        },
      });
  
      if (response.data.length > 0) {
        // Populate fields with fetched data
        const billData = response.data[0].form_data || {};
        const updatedFieldValues = formFields.reduce((acc, field) => {
          acc[field.name] = billData[field.name] || '0'; // Default to 0 if not found
          return acc;
        }, {});
        setFieldValues(updatedFieldValues);
      } else {
        // Reset fields to 0 if no data is found
        const resetFieldValues = formFields.reduce((acc, field) => {
          acc[field.name] = '0'; // Default value is 0
          return acc;
        }, {});
        setFieldValues(resetFieldValues);
      }
    } catch (error) {
      console.error('Error fetching bill setup data:', error);
    }
  };
  

  
  
  
  
  const handleFormSelection = (formId) => {
    setSelectedFormId(formId);
    fetchFormFields(formId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Update formData state
    setFormData((prev) => ({ ...prev, [name]: value }));
  
    // Fetch data if property type, area, or number changes
    if (name === 'property_type_id' || name === 'property_area_id' || name === 'property_number_id') {
      fetchBillSetupData();
    }
  };
  
  

  const handleFieldValueChange = (fieldName, value) => {
    setFieldValues((prev) => ({
      ...prev,
      [fieldName]: value === '' ? '0' : value, // Reset to 0 if the field is cleared
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      form_id: selectedFormId,
      property_type_name: formData.property_type_id,
      property_area: formData.property_area_id,
      property_number: formData.property_number_id,
      form_data: fieldValues,
    };
  
    try {
      // Check if a bill setup already exists
      const existingEntryResponse = await axios.get('http://127.0.0.1:8000/bills-setup/', {
        params: {
          property_type_name: formData.property_type_id,
          property_area: formData.property_area_id,
          property_number: formData.property_number_id || null,
        },
      });
  
      if (existingEntryResponse.data.length > 0) {
        // Update existing entry
        const existingBillSetupId = existingEntryResponse.data[0].bill_setup_id;
  
        const updateResponse = await axios.put(
          `http://127.0.0.1:8000/bills-setup/${existingBillSetupId}/`,
          payload
        );
  
        if (updateResponse.status === 200) {
          setSuccessMessage('Bill setup updated successfully');
          setErrorMessage('');
        } else {
          setErrorMessage('Failed to update bill setup');
          setSuccessMessage('');
        }
      } else {
        // Create a new entry
        const createResponse = await axios.post('http://127.0.0.1:8000/bills-setup/', payload);
  
        if (createResponse.status === 201) {
          setSuccessMessage('Bill setup created successfully');
          setErrorMessage('');
        } else {
          setErrorMessage('Failed to create bill setup');
          setSuccessMessage('');
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage('Error submitting bill setup');
      setSuccessMessage('');
    }
  };
  

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Bill Setup</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-4 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
            <select
              name="property_type_id"
              value={formData.property_type_id}
              onChange={handleInputChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            >
              <option value="">Select Property Type</option>
              {propertyTypes.map((type) => (
                <option key={type.pro_type_id} value={type.pro_type_id}>
                  {type.property_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Area</label>
            <select
              name="property_area_id"
              value={formData.property_area_id}
              onChange={handleInputChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            >
              <option value="">Select Property Area</option>
              {areaTypes.map((area) => (
                <option key={area.area_type_id} value={area.area_type_id}>
                  {area.area_type_name} - {area.area_value}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Number</label>
            <select
              name="property_number_id"
              value={formData.property_number_id}
              onChange={handleInputChange}
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            >
              <option value="">Select Property Number</option>
              {properties.map((property) => (
                <option key={property.property_id} value={property.property_id}>
                  {property.block_name?.block_name} - {property.property_number} - {property.joint_number}
                </option>
              ))}
            </select>
          </div>
              {/* Form Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Form</label>
          <select
            value={selectedFormId}
            onChange={(e) => handleFormSelection(e.target.value)}
            required
            className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
          >
            <option value="">Select Form</option>
            {forms.map((form) => (
              <option key={form.id} value={form.id}>
                {form.form_name}
              </option>
            ))}
          </select>
        </div>
        </div>

        {formFields.length > 0 && (
         <div>
         <h2 className="text-xl font-semibold text-gray-800 mb-4">Form Fields</h2>
        <div className='grid md:grid-cols-3 gap-2'>
         {formFields.map((field) => (
  <div key={field.name} className="flex flex-col  mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {field.label}
    </label>
    <input
      type={field.type === 'number' ? 'number' : 'text'}
      value={fieldValues[field.name] || '0'} // Default to 0 if no value
      onFocus={(e) => {
        if (e.target.value === '0') e.target.value = ''; // Clear value if it is 0
      }}
      onChange={(e) => handleFieldValueChange(field.name, e.target.value)}
      className="flex-1 px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-green-700 focus:border-green-700"
      required={field.required}
    />
  </div>
))}
</div>
       </div>
       
        )}
        

        <button
          type="submit"
          className="w-full text-white bg-green-700 hover:bg-green-800 py-2 px-4 rounded-md transition duration-300"
        >
          Submit
        </button>
      </form>

      {successMessage && <div className="mt-6 text-green-600 text-sm">{successMessage}</div>}
      {errorMessage && <div className="mt-6 text-red-600 text-sm">{errorMessage}</div>}
    </div>
  );
};

export default BillSetupForm;
