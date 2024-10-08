import React from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { BsThreeDotsVertical } from "react-icons/bs";

const PropertyList = ({ properties }) => {
  const handleEdit = (property) => {
    console.log('Editing property', property);
    // Implement edit functionality here
  };

  const handleDelete = (property) => {
    console.log('Deleting property', property);
    // Implement delete functionality here
  };

  const handleView = (property) => {
    console.log('Viewing property', property);
    // Implement view functionality here
  };

  return (
    <div className="py-5">
      <table className="min-w-full text-sm text-gray-600 bg-white border-collapse border border-gray-200">
        <thead>
          <tr className=''>
            <th className="border text-start px-4 py-2">#</th>
            <th className="border text-start px-4 py-2">Name</th>
            <th className="border text-start px-4 py-2">Property Type</th>
            <th className="border text-start px-4 py-2">Owner</th>
            <th className="border text-start px-4 py-2">Location</th>
            <th className="border text-start px-4 py-2">Status</th>
            <th className="border text-start px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{property.No}</td>
              <td className="border px-4 py-2">{property.Name}</td>
              <td className="border px-4 py-2">{property.propertyType}</td>
              <td className="border px-4 py-2">{property.owner}</td>
              <td className="border px-4 py-2">{property.location}</td>
              <td className="border px-4 py-2">{property.status}</td>
              <td className="border px-4 py-2">
                {/* Dropdown Actions */}
                <div className="relative">
                  <button className="focus:outline-none"><BsThreeDotsVertical/></button>
                  <div className="absolute bg-white shadow-lg border border-gray-200 hidden group-hover:block">
                    <ul className="block text-left">
                      <li className="px-4 flex items-center  gap-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleView(property)}>
                        <FaEye /> View
                      </li>
                      <li className="px-4 flex items-center  gap-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleEdit(property)}>
                        <FaEdit /> Edit
                      </li>
                      <li className="px-4 flex items-center  gap-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleDelete(property)}>
                        <FaTrash /> Delete
                      </li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Example property data
const properties = [
  { No: 1, Name: 'Sunset Villa', propertyType: 'House', owner: 'John Doe', location: 'Los Angeles, CA', status:'Available' },
  { No: 2, Name: 'Sunset Villa', propertyType: 'House', owner: 'John Doe', location: 'Los Angeles, CA', status:'Available' },

  // Add more properties here
];

export default function PropertyListPage() {
  return (
    <>
      <PropertyList properties={properties} />
    </>
  );
}
