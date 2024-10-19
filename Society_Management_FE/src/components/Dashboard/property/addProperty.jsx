import React, { useState, useEffect } from 'react';
import useProperty from '../../../hooks/useProperty';
import useBlock from '../../../hooks/useBlock';
import useAmenity from '../../../hooks/useAmenity';
import useUnitType from '../../../hooks/useUnitType';
import usePropertyType from '../../../hooks/usePropertyType';

const AddProperty = () => {
  const [propertyData, setPropertyData] = useState({
    block_name: '',
    building_name: '',
    property_name: '',
    property_type: '',
    unit_type: '',
    floor_number: '',
    number_of_bedrooms: '',
    number_of_bathrooms: '',
    balcony_or_patio: '',
    parking_space: '',
    number_of_halls: '',
    street_address: '',
    city: '',
    country: '',
    area_type: '',
    area_value: '',
    property_value: '',
    amenity_name: '',
    size_in_sqm: ''
  });

  const { blocks, fetchBlocks } = useBlock();
  const { amenities, fetchAmenities } = useAmenity();
  const { unitTypes, fetchUnitTypes} = useUnitType();
  const { propertyTypes, fetchPropertyTypes} = usePropertyType();
  const { addProperty, successMessage, errorMessage, setSuccessMessage } = useProperty();

  useEffect(() => {
    fetchBlocks();
    fetchAmenities();
    fetchPropertyTypes();
    fetchUnitTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedUnitType = unitTypes.find(
      (unitType) => unitType.unit_type_id === propertyData.unit_type
    );
    console.log(selectedUnitType);
    const success = await addProperty(propertyData);
    if (success) {
      setSuccessMessage('Property added successfully!');
      setPropertyData({
        block_name: '',
        building_name: '',
        property_name: '',
        property_type: '',
        unit_type: '',
        floor_number: '',
        number_of_bedrooms: '',
        number_of_bathrooms: '',
        balcony_or_patio: '',
        parking_space: '',
        number_of_halls: '',
        street_address: '',
        city: '',
        country: '',
        area_type: '',
        area_value: '',
        property_value: '',
        amenity_name: '',
        size_in_sqm: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <div className='grid grid-cols-3 gap-x-2'>
    <div className="mb-2">
      <input type="text" name="property_name" placeholder='Property Name' value={propertyData.property_name} onChange={handleChange} required className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"/>
    </div>
    <div className="mb-2">
<select name="block_name" value={propertyData.block_name} onChange={handleChange} required className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700">
  <option value="">Select Block</option>
  {blocks.map((block) => (
    <option key={block.id} value={block.id}>{block.block_name}</option>  
  ))}
</select>
</div>
    <div className="mb-2">
      <input type="text" name="building_name" placeholder='Building Name' value={propertyData.building_name} onChange={handleChange} required className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"/>
    </div>
    <div className="mb-2">
      <select name="property_type" value={propertyData.property_type} onChange={handleChange} required className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700">
        <option value="">Select Property Type</option>
        {propertyTypes.map((propertyType) => (
    <option key={propertyType.pro_type_id} value={propertyType.pro_type_id}>{propertyType.property_number} - {propertyType.property_name}</option>  
  ))}
      </select>
    </div>
    <div className="mb-2">
      <select name="unit_type" value={propertyData.unit_type} onChange={handleChange} required className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700">
        <option value="">Select Unit Type</option>
        {unitTypes.map((unitType) => (
    <option key={unitType.unit_type_id} value={unitType.unit_type_id}>{unitType.unit_number} - {unitType.unit_name}</option>  
  ))}
      </select>
    </div>
    <div className="mb-2">
    <select name="floor_number" value={propertyData.floor_number} onChange={handleChange} required className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700">
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
      <input type="number" name="number_of_bedrooms" placeholder='Number of Bedrooms' value={propertyData.number_of_bedrooms} onChange={handleChange} required className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"/>
    </div>
    <div className="mb-2">
      <input type="number" name="number_of_bathrooms" placeholder='Number of Bathrooms' value={propertyData.number_of_bathrooms} onChange={handleChange} required className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"/>
    </div>
   
   
    <div className="mb-2">
      <input type="number" name="number_of_halls" placeholder='Number of Halls' value={propertyData.number_of_halls} onChange={handleChange} required className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"/>
    </div>
  
    <div className="mb-2">
      <input type="number" name="size_in_sqm" placeholder='Size (sqm)' value={propertyData.size_in_sqm} onChange={handleChange} required className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"/>
    </div>
    <div className="mb-2">
          <select name="balcony_or_patio" value={propertyData.balcony_or_patio} onChange={handleChange} className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700">
            <option value="">Balcony/Patio</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="mb-2">
          <select name="parking_space" value={propertyData.parking_space} onChange={handleChange} className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700">
            <option value="">Parking Space</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="mb-2">
          <input type="text" name="street_address" placeholder='Street Address' value={propertyData.street_address} onChange={handleChange} className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700" />
        </div>
        <div className="mb-2">
          <input type="text" name="city" placeholder='City' value={propertyData.city} onChange={handleChange} className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700" />
        </div>
        <div className="mb-2">
          <input type="text" name="country" placeholder='Country' value={propertyData.country} onChange={handleChange} className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700" />
        </div>
        <div className="mb-2">
          <select name="area_type" value={propertyData.area_type} onChange={handleChange} className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700">
            <option value="">Area Type</option>
            <option value="SQFT">Square Feet (SQFT)</option>
            <option value="MARLA">Marla</option>
            <option value="KANAL">Kanal</option>
          </select>
        </div>
        <div className="mb-2">
          <input type="number" name="area_value" placeholder='Area Value' value={propertyData.area_value} onChange={handleChange} className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700" />
        </div>
        <div className="mb-2">
          <input type="text" name="property_value" placeholder='Property Value' value={propertyData.property_value} onChange={handleChange} className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700" />
        </div>
        <div className="mb-2">

          <select name="amenity_name" value={propertyData.amenity_name} onChange={handleChange} required className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700">
        <option value="">Select Amenity</option>
        {amenities.map((amenity) => (
    <option key={amenity.amenity_id} value={amenity.amenity_id}>{amenity.amenity_name}</option>  
  ))}
      </select>
        </div>
    </div>
    <button type="submit"  className="w-auto mt-2 bg-green-700 text-white px-5 py-2 rounded-sm hover:bg-green-600 transition-colors duration-300">Add Property</button>

    {successMessage && <p  className="success mt-4 text-green-600 text-sm">{successMessage}</p>}
    {errorMessage && <p className="error mt-4 text-red-600 text-sm">{errorMessage}</p>}
  </form>
  );
};

export default AddProperty;  