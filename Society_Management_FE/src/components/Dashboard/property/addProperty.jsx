import React from 'react';

const AddProperty = () => {
  return (
    <>
      <form className='py-5 '>
        <div className='grid grid-cols-3 gap-x-4'>
          {/* Block Name */}
          <div className="mb-4">
            <select
              id="block-name"
              name="block-name"
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            >
              <option value="">Select Block Name</option>
              <option value="Block A">Block A</option>
              <option value="Block B">Block B</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Building Name/Plaza Name */}
          <div className="mb-4">
            <input
              type="text"
              id="building-name"
              name="building-name"
              placeholder="Building/Plaza Name"
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>

          {/* Property ID */}
          <div className="mb-4">
            <input
              type="text"
              id="property-id"
              name="property-id"
              placeholder="Property ID"
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>

          {/* Property Name */}
          <div className="mb-4">
            <input
              type="text"
              id="property-name"
              name="property-name"
              placeholder="Property Name"
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>

          {/* Property Type */}
          <div className="mb-4">
            <select
              id="property-type"
              name="property-type"
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            >
              <option value="">Select Property Type</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          {/* Unit Type */}
          <div className="mb-4">
            <select
              id="unit-type"
              name="unit-type"
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            >
              <option value="">Select Unit Type</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Shop">Shop</option>
            </select>
          </div>

          {/* Unit Number */}
          <div className="mb-4">
            <input
              type="text"
              id="unit-number"
              name="unit-number"
              placeholder="Unit Number"
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>

          {/* Floor Number */}
          <div className="mb-4">
            <select
              id="floor-number"
              name="floor-number"
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            >
              <option value="">Select Floor Number</option>
              {[...Array(10)].map((_, i) => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>

          {/* Number of Bedrooms */}
          <div className="mb-4">
            <input
              type="number"
              id="number-bedrooms"
              name="number-bedrooms"
              placeholder="Number of Bedrooms"
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>

          {/* Number of Bathrooms */}
          <div className="mb-4">
            <input
              type="number"
              id="number-bathrooms"
              name="number-bathrooms"
              placeholder="Number of Bathrooms"
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>

          {/* Balconies/Patio */}
          <div className="mb-4">
            <input
              type="text"
              id="balcony-patio"
              name="balcony-patio"
              placeholder="Balcony/Patio (Yes/No or Size)"
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>

          {/* Parking Space */}
          <div className="mb-4">
            <input
              type="text"
              id="parking-space"
              name="parking-space"
              placeholder="Parking Space (Yes/No or Details)"
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>

          {/* Number of Halls */}
          <div className="mb-4">
            <input
              type="number"
              id="number-halls"
              name="number-halls"
              placeholder="Number of Halls"
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>

          {/* Owner */}
          <div className="mb-4">
            <input
              type="text"
              id="owner-name"
              name="owner-name"
              placeholder="Owner Name"
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Location (Address, City)"
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>

          {/* Size */}
          <div className="mb-4">
            <input
              type="text"
              id="property-size"
              name="property-size"
              placeholder="Size (in sq Marla)"
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>

          {/* Property Value */}
          <div className="mb-4">
            <input
              type="text"
              id="property-value"
              name="property-value"
              placeholder="Property Value"
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>

          {/* Status */}
          <div className="mb-4">
            <select
              id="property-status"
              name="property-status"
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            >
              <option value="">Select Status</option>
              <option value="Available">Available</option>
              <option value="Rented">Rented</option>
              <option value="Maintenance Pending">Maintenance Pending</option>
            </select>
          </div>

          {/* Amenities */}
          <div className="mb-4">
            <textarea
              id="property-amenities"
              name="property-amenities"
              placeholder="Amenities (e.g., Pool, Garden, Gym)"
              rows="2"
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            ></textarea>
          </div>

          {/* Attach Document */}
          <div className="mb-4">
            <input
              type="file"
              id="property-document"
              name="property-document"
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-auto bg-green-700 text-white px-5 py-2 rounded-sm hover:bg-green-600 transition-colors duration-300"
        >
          Add New Property
        </button>
      </form>
    </>
  );
};

export default AddProperty;
