import React, { useState, useEffect } from 'react';
import useProperty from '../../../hooks/useProperty';
import useBlock from '../../../hooks/useBlock';
import useAmenity from '../../../hooks/useAmenity';
import useUnitType from '../../../hooks/useUnitType';
import usePropertyType from '../../../hooks/usePropertyType';
import useAreaType from '../../../hooks/useAreaType';

const AddProperty = () => {
  const [propertyData, setPropertyData] = useState({
    block_name: '',
    building_name: '',
    property_name: '',
    property_type: '',
    property_number: '',
    joint_number: '',
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
    property_area: '',
    property_value: '',
    status:'',
    amenity_name: '',
    size_in_sqm: '',
    is_active:false,
    document_attachment:'',
    is_rented:0
  });

  const { blocks, fetchBlocks } = useBlock();
  const { amenities, fetchAmenities } = useAmenity();
  const { unitTypes, fetchUnitTypes} = useUnitType();
  const { propertyTypes, fetchPropertyTypes} = usePropertyType();
  const { areaTypes, fetchAreaTypes} = useAreaType();
  const {countries, cities, fetchCities, addProperty, successMessage, errorMessage, setSuccessMessage } = useProperty();
  
  useEffect(() => {
    fetchBlocks();
    fetchAmenities();
    fetchPropertyTypes();
    fetchUnitTypes();
    fetchAreaTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));

     // If country is selected, fetch cities for that country
     if (name === 'country') {
      fetchCities(value);
    }
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    // Append non-file fields to FormData
    Object.keys(propertyData).forEach((key) => {
      if (key !== 'document_attachment' && key !== 'is_rented') {
        formData.append(key, propertyData[key]);
      }
    });
  
    // Append the document_attachment (file) to FormData if it exists
    if (propertyData.document_attachment) {
      formData.append('document_attachment', propertyData.document_attachment);
    }
  
    // Handle is_rented as 1 or 0 and append it to FormData
    formData.append('is_rented', propertyData.is_rented ? 'True' : 'False');
  
    // Submit the form data to the backend
    try {
      const response = await addProperty(formData);
  
  
      setSuccessMessage('Property added successfully!');
      setPropertyData({
        block_name: '',
        building_name: '',
        property_name: '',
        property_type: '',
        property_number: '',
        joint_number: '',
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
        property_area: '',
        property_value: '',
        status: '',
        amenity_name: '',
        size_in_sqm: '',
        is_active: false,
        document_attachment: '',
        is_rented: 0
      });
    } catch (error) {
      console.error("Error adding property:", error);
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
    <option key={propertyType.pro_type_id} value={propertyType.pro_type_id}>{propertyType.property_name}</option>  
  ))}
      </select>
    </div>
    <div className="mb-2">
      <input type="number" name="property_number" placeholder='Property Number' value={propertyData.property_number} onChange={handleChange} required className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"/>
    </div>
    <div className="mb-2">
      <input type="number" name="joint_number" placeholder='Joint Number' value={propertyData.joint_number} onChange={handleChange} required className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"/>
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
        <select
          name="country"
          value={propertyData.country}
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
          value={propertyData.city}
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
        {/* <div className="mb-2">
          <select name="area_type" value={propertyData.area_type} onChange={handleChange} className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700">
            <option value="">Area Type</option>
            <option value="SQFT">Square Feet (SQFT)</option>
            <option value="MARLA">Marla</option>
            <option value="KANAL">Kanal</option>
          </select>
        </div> */}
        <div className="mb-2">
      <select name="property_area" value={propertyData.property_area} onChange={handleChange} required className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700">
        <option value="">Select Property Area</option>
        {areaTypes.map((areaType) => (
    <option key={areaType.area_type_id} value={areaType.area_type_id}>{areaType.area_type_name} {areaType.area_value}</option>  
  ))}
      </select>
    </div>
        {/* <div className="mb-2">
          <input type="number" name="area_value" placeholder='Area Value' value={propertyData.area_value} onChange={handleChange} className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700" />
        </div> */}
        <div className="mb-2">
          <input type="text" name="property_value" placeholder='Property Value' value={propertyData.property_value} onChange={handleChange} className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700" />
        </div>
        <div className='mb-2'>
        <select name="status" value={propertyData.status} onChange={handleChange} className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700">
            <option value="">Select Status</option>
            <option value="Available">Available</option>
            <option value="Rented">Rented</option>
            <option value="Maintenance Pending ">Maintenance Pending</option>
          </select>
        </div>
        <div className="mb-2">

          <select name="amenity_name" value={propertyData.amenity_name} onChange={handleChange} required className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700">
        <option value="">Select Amenity</option>
        {amenities.map((amenity) => (
    <option key={amenity.amenity_id} value={amenity.amenity_id}>{amenity.amenity_name}</option>  
  ))}
      </select>
        </div>
        <div className="flex flex-row items-center gap-5">
  <span className="">Is Rented</span>
  <div className="flex space-x-4">
    <label className="flex items-center">
      <input
        type="radio"
        name="is_rented"
        value='True'// Send 1 for true
        checked={propertyData.is_rented === 1}
        onChange={() =>
          setPropertyData((prevData) => ({
            ...prevData,
            is_rented: 1, // Store true in state
          }))
        }
        className="mr-2"
      />
      Yes
    </label>

    <label className="flex items-center">
      <input
        type="radio"
        name="is_rented"
        value='False' // Send 0 for false
        checked={propertyData.is_rented === 0}
        onChange={() =>
          setPropertyData((prevData) => ({
            ...prevData,
            is_rented: 0, // Store false in state
          }))
        }
        className="mr-2"
      />
      No
    </label>
  </div>
</div>

        <div className="flex items-center mb-2">
  <input
    type="checkbox"
    name="is_active"
    checked={propertyData.is_active === 'true'}
    onChange={(e) =>
      setPropertyData((prevData) => ({
        ...prevData,
        is_active: e.target.checked ? 'true' : 'false',
      }))
    }
    className="h-4 w-4 text-green-600 focus:ring-0 border-gray-300 rounded"
  />
  <label className="ml-2 text-sm text-gray-600">Is Active</label>
</div>

        <div className="mb-2">
          <input
            type="file"
            id="document_attachment"
            name="document_attachment"
            onChange={(e) =>
              setPropertyData({
                ...propertyData,
                document_attachment: e.target.files[0],
              })
            }
            className="mt-1 text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            accept=".pdf,.doc,.docx,.jpg,.png"
          />
        </div>
    </div>
    <button type="submit"  className="w-auto mt-2 bg-green-700 text-white px-5 py-2 rounded-sm hover:bg-green-600 transition-colors duration-300">Add Property</button>

    {successMessage && <p  className="success mt-4 text-green-600 text-sm">{successMessage}</p>}
    {errorMessage && <p className="error mt-4 text-red-600 text-sm">{errorMessage}</p>}
  </form>
  );
};

export default AddProperty;  