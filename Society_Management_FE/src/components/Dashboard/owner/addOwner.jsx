import React, { useEffect, useState } from 'react';
import useOwner from '../../../hooks/useOwner';
import useProperty from '../../../hooks/useProperty';
const AddOwner = () => {
  const [ownerData, setOwnerData] = useState({
    owner_name: '',
    owner_guardian_name: '',
    owner_profile_picture: '',
    owner_phone_number: '',
    password: '',
    owner_email: '',
    owner_membership_number: '',
    owner_cnic: '',
    owner_address: '',
    owner_country: '',
    owner_city: '',
    document_attachment: '',
    properties: [],
  });
  const { countries, cities, fetchCities, fetchOwners, addOwner, successMessage, errorMessage } = useOwner();
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/property_info/');
        const data = await response.json();
        const updatedProperties = data.map(property => ({
          ...property,
          isAssigned: !!property.owner_id
        }));
        setProperties(updatedProperties);
      } catch (err) {
        setErrorMessage('Failed to load properties.');
      }
    };

    fetchProperties();
    fetchOwners();
  }, []);

  const handlePropertyChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const selectedPropertyIds = selectedOptions.map((option) => parseInt(option.value, 10));

    setOwnerData((prevData) => ({
      ...prevData,
      properties: selectedPropertyIds,
    }));
    setSelectedProperty(selectedPropertyIds);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOwnerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'owner_country') {
      fetchCities(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(ownerData).forEach((key) => {
      if (key !== 'document_attachment') {
        if (Array.isArray(ownerData[key])) {
          ownerData[key].forEach((propertyId) => {
            formData.append('properties', propertyId);
          });
        } else {
          formData.append(key, ownerData[key]);
        }
      }
    });

    if (ownerData.document_attachment) {
      formData.append('document_attachment', ownerData.document_attachment);
    }

    const success = await addOwner(formData);

    if (success) {
      successMessage('Owner added successfully!');
      setOwnerData({
        owner_name: '',
        owner_guardian_name: '',
        owner_profile_picture: '',
        owner_phone_number: '',
        password: '',
        owner_email: '',
        owner_membership_number: '',
        owner_cnic: '',
        owner_address: '',
        owner_country: '',
        owner_city: '',
        document_attachment: '',
        properties: [],
      });
      setSelectedProperty([]); // Reset the selected properties
    }
  };

  return (
    <>
      <form className='py-5' onSubmit={handleSubmit}>
        <div className='grid grid-cols-3 gap-x-2'>
          <div className="mb-4">
            <input
              type="text"
              id="owner_name"
              name="owner_name"
              placeholder="Owner Name"
              value={ownerData.owner_name}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="owner_guardian_name"
              name="owner_guardian_name"
              placeholder="Owner Guardian Name"
              value={ownerData.owner_guardian_name}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className='mb-4'>
            <input
              type="file"
              id="owner_profile_picture"
              name="owner_profile_picture"
              onChange={(e) =>
                setOwnerData({
                  ...ownerData,
                  owner_profile_picture: e.target.files[0],
                })
              }
              className="text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
              accept=".pdf,.doc,.docx,.jpg,.png"
            />
          </div>
          <div className="mb-4">
            <input
              type="tel"
              id="owner_phone_number"
              name="owner_phone_number"
              placeholder="Owner Phone Number"
              value={ownerData.owner_phone_number}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={ownerData.password}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="owner_email"
              name="owner_email"
              placeholder="Owner Email"
              value={ownerData.owner_email}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="owner_membership_number"
              name="owner_membership_number"
              placeholder="Owner Membership Number"
              value={ownerData.owner_membership_number}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="owner_cnic"
              name="owner_cnic"
              placeholder="Owner CNIC"
              value={ownerData.owner_cnic}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="owner_address"
              name="owner_address"
              placeholder="Owner Address"
              value={ownerData.owner_address}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className="mb-2">
            <select
              name="owner_country"
              value={ownerData.owner_country}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.iso2} value={country.country}>
                  {country.country}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <select
              name="owner_city"
              value={ownerData.owner_city}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            >
              <option value="">Select City</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <input
              type="file"
              id="document_attachment"
              name="document_attachment"
              onChange={(e) =>
                setOwnerData({
                  ...ownerData,
                  document_attachment: e.target.files[0],
                })
              }
              className="mt-1 text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
              accept=".pdf,.doc,.docx,.jpg,.png"
            />
          </div>
          <div className="mb-4">
          <div className="mb-4">
          <select
            multiple
            className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            id="property"
            value={selectedProperty}
            onChange={handlePropertyChange}
          >
            <option value="">Select Property</option>
            {properties.map((property) => (
              <option
                key={property.property_id}
                value={property.property_id}
                disabled={property.isAssigned}
                style={{
                  color: property.isAssigned ? 'gray' : 'black',
                  textDecoration: property.isAssigned ? 'line-through' : 'none',
                }}
              >
                {`( ${property.block_name?.block_name} ) - ${property.property_number}, Joint Number: ${property.joint_number}`}
              </option>
            ))}
          </select>
        </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-auto bg-green-700 text-white px-5 py-2 rounded-sm hover:bg-green-600 transition-colors duration-300"
        >
          Add Owner
        </button>
      </form>

        {/* Success Message */}
     {successMessage && (
      <div className="mt-4 text-green-600 text-sm">
        {successMessage}
      </div>
    )}

    {/* Error Message */}
    {errorMessage && (
      <div className="mt-4 text-red-600 text-sm">
        {errorMessage}
      </div>
    )}

    </>
  );
};

export default AddOwner;
