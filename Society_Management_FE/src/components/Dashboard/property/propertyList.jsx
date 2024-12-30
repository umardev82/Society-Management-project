import React, { useState, useEffect } from 'react';
import useProperty from '../../../hooks/useProperty';
import useBlock from '../../../hooks/useBlock';
import useAmenity from '../../../hooks/useAmenity';
import useUnitType from '../../../hooks/useUnitType';
import usePropertyType from '../../../hooks/usePropertyType';
import useAreaType from '../../../hooks/useAreaType';
import Modal from '../modal';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const PropertyList = () => {
  const {countries, cities, fetchCities, properties, deleteProperty, fetchProperties, editProperty, loading, error } = useProperty();
  const { blocks, fetchBlocks } = useBlock();
  const { amenities, fetchAmenities } = useAmenity();
  const { unitTypes, fetchUnitTypes} = useUnitType();
  const { propertyTypes, fetchPropertyTypes} = usePropertyType();
  const { areaTypes, fetchAreaTypes } = useAreaType(); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [editPropertyData, setEditPropertyData] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchProperties();
    fetchAmenities();
    fetchBlocks();
    fetchUnitTypes();
    fetchPropertyTypes();
    fetchAreaTypes();
  }, []);
    // Log whenever successMessage or errorMessage changes
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading properties: {error.message}</div>;
  }

  const handleOpenEditModal = (property) => {
    setSelectedProperty(property);
    setEditPropertyData({
      block_name: property.block_name?.id,      
      building_name: property.building_name,
      property_name: property.property_name,
      property_type: property.property_type?.pro_type_id,
      property_number: property.property_number,
      joint_number: property.joint_number,
      unit_type: property.unit_type?.unit_type_id,
      floor_number: property.floor_number,
      number_of_bedrooms: property.number_of_bedrooms,
      number_of_bathrooms: property.number_of_bathrooms,
      balcony_or_patio: property.balcony_or_patio,
      parking_space: property.parking_space,
      number_of_halls: property.number_of_halls,
      street_address: property.street_address,
      city: property.city,
      country: property.country,
      property_area: property.property_area?.area_type_id,
      property_value: property.property_value,
      status:property.status,
      amenity_name: property.amenity_name?.amenity_id,
      size_in_sqm: property.size_in_sqm,
      is_active:property.is_active,
      document_attachment:property.document_attachment,
      is_rented:property.is_rented,
    });
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (property) => {
    setSelectedProperty(property);
    setIsDeleteModalOpen(true);
  };

  const handleOpenViewModal = (property) => {
    setSelectedProperty(property);
    setIsViewModalOpen(true);
  };




  const handleEditProperty = async () => {
    if (selectedProperty) {
      const result = await editProperty(selectedProperty.property_id, editPropertyData);
      
      if (!result.success) {
        setErrorMessage(result.message); // Set error message from API response
      } else {
        setErrorMessage('');
        setSuccessMessage(result.message); // Set success message if successful
        setTimeout(() => {
          setIsEditModalOpen(false);
          setSelectedProperty(null);
          setSuccessMessage('');
          setErrorMessage('');
          fetchProperties();
        }, 2000);
      }
    }
  };
  
  
  

  const handleDeleteProperty = () => {
    if (selectedProperty) {
      deleteProperty(selectedProperty.property_id);
      setIsDeleteModalOpen(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditPropertyData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked: value,
    }));
    if (name === 'country') {
      fetchCities(value);
    }
  };


  


  return (
    <div className="py-5 overflow-x-scroll">
      <table className=" text-sm text-gray-600 bg-white border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">#</th>
            <th className="border text-start px-4 whitespace-nowrap py-2">Block Name</th>
            <th className="border text-start px-4 whitespace-nowrap py-2">Building Name</th>
            <th className="border text-start px-4 whitespace-nowrap py-2">Property Name</th>
            <th className="border text-start px-4 whitespace-nowrap py-2">Property Number</th>
            <th className="border text-start px-4 whitespace-nowrap py-2">Joint Number</th>
            <th className="border text-start px-4 whitespace-nowrap py-2">Property Type</th>
            <th className="border text-start px-4 whitespace-nowrap py-2">Unit Number</th>
            <th className="border text-start px-4 whitespace-nowrap py-2">Unit Type</th>
            <th className="border text-start px-4 whitespace-nowrap py-2">Floor Number</th>
            <th className="border text-start px-4 whitespace-nowrap py-2">Number Of Bedrooms</th>
            <th className="border text-start px-4 whitespace-nowrap py-2">Number Of Bathrooms</th>
            <th className="border text-start px-4 whitespace-nowrap py-2">Balcony/Patio</th>
            <th className="border text-start px-4 whitespace-nowrap py-2">Parking Space</th>
            <th className="border text-start px-4 whitespace-nowrap py-2">No Of Halls</th>
            <th className="border text-start px-4 whitespace-nowrap py-2">Street Address</th>
            <th className="border text-start px-4 whitespace-nowrap py-2">City</th>
            <th className="border text-start px-4 whitespace-nowrap py-2">Country</th>
            <th className="border text-start px-4 whitespace-nowrap py-2">Property Area</th>
            <th className="border text-start px-4 whitespace-nowrap py-2">Property Value</th>
            <th className="border text-start px-4 whitespace-nowrap py-2">Amenity Name</th>
            <th className="border text-start px-4 whitespace-nowrap py-2">Size in SQM</th>
            <th className="border text-start px-4 whitespace-nowrap py-2">Status</th>
            <th className="border text-start px-4 whitespace-nowrap py-2">Is Active</th>
            <th className="border text-start px-4 whitespace-nowrap py-2">Is Rented</th>
            <th className="border text-start px-4 whitespace-nowrap py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property, index) => (
            <tr key={property.property_id}>
              <td className="border px-4 whitespace-nowrap py-2 ">{index + 1}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{property.block_name?.block_name || "N/A"}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{property.building_name}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{property.property_name}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{property.property_number}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{property.joint_number}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{property.property_type?.property_name}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{property.unit_type?.unit_number}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{property.unit_type?.unit_name}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{property.floor_number}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{property.number_of_bedrooms}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{property.number_of_bathrooms}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{property.balcony_or_patio}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{property.parking_space}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{property.number_of_halls}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{property.street_address}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{property.city}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{property.country}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{property.property_area?.area_type_name} - {property.property_area?.area_value}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{property.property_value}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{property.amenity_name?.amenity_name}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{property.size_in_sqm}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{property.status}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{property.is_active ? 'Yes' : 'No'}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{property.is_rented ? 'Yes' : 'No'}</td>

              <td className="border px-4 whitespace-nowrap py-2 ">
                <button className='text-green-700 px-1' onClick={() => handleOpenViewModal(property)}><FaEye /></button>
                <button className='text-yellow-600 px-1' onClick={() => handleOpenEditModal(property)}><FaEdit /></button>
                <button className='text-red-700 px-1' onClick={() => handleOpenDeleteModal(property)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
        <Modal isVisible={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
          <h2 className="text-xl mb-4">Edit Property</h2>
               <div className='grid grid-cols-2 gap-x-2'>
    <div className="mb-2">
      <input type="text" name="property_name" placeholder='Property Name' value={editPropertyData.property_name} onChange={handleChange} required className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"/>
    </div>
    <div className="mb-2">
<select name="block_name" value={editPropertyData.block_name} onChange={handleChange} required className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700">
  <option value="">Select Block</option>
  {blocks.map((block) => (
    <option key={block.id} value={block.id}>{block.block_name}</option>  
  ))}
</select>
</div>
    <div className="mb-2">
      <input type="text" name="building_name" placeholder='Building Name' value={editPropertyData.building_name} onChange={handleChange} required className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"/>
    </div>
    <div className="mb-2">
      <select name="property_type" value={editPropertyData.property_type} onChange={handleChange} required className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700">
        <option value="">Select Property Type</option>
        {propertyTypes.map((propertyType) => (
    <option key={propertyType.pro_type_id} value={propertyType.pro_type_id}>{propertyType.property_name}</option>  
  ))}
      </select>
    </div>
    <div className="mb-2">
      <input type="text" name="property_number" placeholder='Property Number' value={editPropertyData.property_number} onChange={handleChange} required className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"/>
    </div>
    <div className="mb-2">
      <input type="text" name="joint_number" placeholder='Joint Number' value={editPropertyData.joint_number} onChange={handleChange} required className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"/>
    </div>

    <div className="mb-2">
      <select name="unit_type" value={editPropertyData.unit_type} onChange={handleChange} required className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700">
        <option value="">Select Unit Type</option>
        {unitTypes.map((unitType) => (
    <option key={unitType.unit_type_id} value={unitType.unit_type_id}>{unitType.unit_number} - {unitType.unit_name}</option>  
  ))}
      </select>
    </div>
    <div className="mb-2">
    <select name="floor_number" value={editPropertyData.floor_number} onChange={handleChange} required className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700">
        <option value="">Select Floor Number</option>       
        <option value="1">1</option>  
        <option value="2">2</option>  
        <option value="3">3</option>  
        <option value="4">4</option>  
        <option value="5">5</option>  
        <option value="6">6</option>  
        <option value="7">7</option>  
        <option value="8">8</option>  
        <option value="9">9</option>  
        <option value="10">10</option>  
      </select>
    </div>
    <div className="mb-2">
      <input type="number" name="number_of_bedrooms" placeholder='Number of Bedrooms' value={editPropertyData.number_of_bedrooms} onChange={handleChange} required className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"/>
    </div>
    <div className="mb-2">
      <input type="number" name="number_of_bathrooms" placeholder='Number of Bathrooms' value={editPropertyData.number_of_bathrooms} onChange={handleChange} required className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"/>
    </div>
   
   
    <div className="mb-2">
      <input type="number" name="number_of_halls" placeholder='Number of Halls' value={editPropertyData.number_of_halls} onChange={handleChange} required className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"/>
    </div>
  
    <div className="mb-2">
      <input type="number" name="size_in_sqm" placeholder='Size (sqm)' value={editPropertyData.size_in_sqm} onChange={handleChange} required className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"/>
    </div>
    <div className="mb-2">
          <select name="balcony_or_patio" value={editPropertyData.balcony_or_patio} onChange={handleChange} className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700">
            <option value="">Balcony/Patio</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="mb-2">
          <select name="parking_space" value={editPropertyData.parking_space} onChange={handleChange} className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700">
            <option value="">Parking Space</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="mb-2">
          <input type="text" name="street_address" placeholder='Street Address' value={editPropertyData.street_address} onChange={handleChange} className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700" />
        </div>
           
        <div className="mb-2">
        <select
          name="country"
          value={editPropertyData.country}
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
    name="city"
    value={editPropertyData.city}
    onChange={handleChange}
    required
    className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
  >
    <option value="">Select City</option>
    {cities.map((city, index) => (
      <option key={index} value={city}>{city}</option>
    ))}
  </select>
</div>
        <div className="mb-2">
          <select name="property_area" value={editPropertyData.property_area} onChange={handleChange} className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700">
          <option value="">Select Area Type</option>
        {areaTypes.map((areaType) => (
    <option key={areaType.area_type_id} value={areaType.area_type_id}>{areaType.area_type_name} - {areaType.area_value}</option>  
  ))}</select>
        </div>
        <div className="mb-2">
          <input type="text" name="property_value" placeholder='Property Value' value={editPropertyData.property_value} onChange={handleChange} className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700" />
        </div>
        <div className='mb-2'>
        <select name="status" value={editPropertyData.status} onChange={handleChange} className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700">
            <option value="">Select Status</option>
            <option value="Available">Available</option>
            <option value="Rented">Rented</option>
            <option value="Maintenance Pending ">Maintenance Pending</option>
          </select>
        </div>
        <div className="mb-2">

          <select name="amenity_name" value={editPropertyData.amenity_name} onChange={handleChange} required className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700">
        <option value="">Select Amenity</option>
        {amenities.map((amenity) => (
    <option key={amenity.amenity_id} value={amenity.amenity_id}>{amenity.amenity_name}</option>  
  ))}
      </select>
        </div>
        <div className="mb-2">
  <label className="block text-sm mb-1">Is Rented</label>
  <div className="flex items-center">
    <label className="mr-4">
      <input
        type="radio"
        name="is_rented"
        value={true}
        checked={editPropertyData.is_rented === true}
        onChange={() => handleChange({ target: { name: 'is_rented', value: true } })}
        className="mr-2"
      />
      Yes
    </label>
    <label>
      <input
        type="radio"
        name="is_rented"
        value={false}
        checked={editPropertyData.is_rented === false}
        onChange={() => handleChange({ target: { name: 'is_rented', value: false } })}
        className="mr-2"
      />
      No
    </label>
  </div>
</div>

 
<div className=" flex items-center mb-2">
  <label>
    <input
      type="checkbox"
      name="is_active"
      checked={editPropertyData.is_active || false}
      onChange={handleChange}
    /> Is Active
  </label>
</div>

    </div>
            <button type="button" className="w-auto mt-2 bg-green-700 text-white px-5 py-2 rounded-sm hover:bg-green-600 transition-colors duration-300" onClick={handleEditProperty}>Save</button>
                     
             {successMessage && <p style={{ color: "green" }}>Success: {successMessage}</p>}
             {errorMessage && <p style={{ color: "red" }}>Error: {errorMessage}</p>}
             
          
        </Modal>
    
    
        <Modal isVisible={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
          <h2 className="text-xl mb-4">Delete Property</h2>
          <p>Are you sure you want to delete {selectedProperty?.property_name}?</p>
          <button type="button" className="mt-4 bg-red-500 text-white px-4 py-2 rounded-sm" onClick={handleDeleteProperty}>Yes, Delete</button>
          <button type="button" className="mt-4 ms-2 bg-green-600 text-white px-4 py-2 rounded-sm" onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
        </Modal>
   

     
        <Modal isVisible={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
          <h2 className="text-xl mb-4">View Property</h2>
          <p><strong>Block Name:</strong> {selectedProperty?.block_name?.block_name}</p>
          <p><strong>Building Name:</strong> {selectedProperty?.building_name}</p>          
          <p><strong>Property Name:</strong> {selectedProperty?.property_name}</p>
          <p><strong>Property Type:</strong> {selectedProperty?.property_type?.property_number} - {selectedProperty?.property_type?.property_name}</p>
          <p><strong>Unit Type:</strong> {selectedProperty?.unit_type?.unit_number} - {selectedProperty?.unit_type?.unit_name}</p>
          <p><strong>Floor Number:</strong> {selectedProperty?.floor_number}</p>
          <p><strong>Bedrooms:</strong> {selectedProperty?.number_of_bedrooms}</p>
          <p><strong>Bathrooms:</strong> {selectedProperty?.number_of_bathrooms}</p>
          <p><strong>Parking Space:</strong> {selectedProperty?.parking_space}</p>
          <p><strong>Balcony/Patio Size:</strong> {selectedProperty?.balcony_or_patio}</p>
          <p><strong>Number of Halls:</strong> {selectedProperty?.number_of_halls}</p>
          <p><strong>Street Address:</strong> {selectedProperty?.street_address}</p>
          <p><strong>City:</strong> {selectedProperty?.city}</p>
          <p><strong>Country:</strong> {selectedProperty?.country}</p>
          <p><strong>Area Type:</strong> {selectedProperty?.area_type}</p>
          <p><strong>Area Value:</strong> {selectedProperty?.area_value}</p>
          <p><strong>Property Value:</strong> {selectedProperty?.property_value}</p>
          <p><strong>Status:</strong> {selectedProperty?.status}</p>
          <p><strong>Amenity:</strong> {selectedProperty?.amenity_name?.amenity_name}</p>
          <p><strong>Size:</strong> {selectedProperty?.size_in_sqm} sqm</p>
          <p><strong>Is Active:</strong> {selectedProperty?.is_active ? 'Yes' : 'No'} </p>
          <p><strong>Is Rented:</strong> {selectedProperty?.is_rented ? 'Yes' : 'No'} </p>         
        </Modal>
    
    </div>
  );
};

export default PropertyList;
