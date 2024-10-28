import React, {useState, useEffect} from 'react'
import useOwner from '../../../hooks/useOwner';
import Modal from '../modal';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa' ;

const OwnerList = () => {
  const {countries, cities, fetchCities, owners, deleteOwner, editOwner, fetchOwners, loading, error } = useOwner();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [editOwnerData, setEditOwnerData] = useState({});
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await fetch('http://127.0.0.1:8000/property_info/'); // Replace with your API endpoint
      const data = await response.json();
      setProperties(data);
    };
    fetchProperties();
     fetchOwners();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
 
 if (error) {
  return <div>Error loading : {error.message}</div>;
 }


 const handleOpenEditModal = (owner) => {
  setSelectedOwner(owner);
  setEditOwnerData({
    owner_name: owner.owner_name,
    owner_guardian_name: owner.owner_guardian_name,
    owner_profile_picture: owner.owner_profile_picture,
    owner_phone_number: owner.owner_phone_number,
    password: owner.password,
    owner_email: owner.owner_email,
    owner_membership_number: owner.owner_membership_number,
    owner_cnic: owner.owner_cnic,
    owner_address: owner.owner_address,
    owner_country: owner.owner_country,
    owner_city: owner.owner_city,
    document_attachment: owner.document_attachment,
    properties: owner.properties?.map(property => property.property_id) || [],
  });
  setIsEditModalOpen(true);
 };

 const handleOpenDeleteModal = (owner) => {
  setSelectedOwner(owner);
  setIsDeleteModalOpen(true);
 };

 const handleOpenViewModal = (owner) => {
  setSelectedOwner(owner);
  setIsViewModalOpen(true);
 };

const handleEditOwner = () => {
  if (selectedOwner) {
    editOwner(selectedOwner.owner_id,editOwnerData).then(() => {
      fetchOwners();
      setIsEditModalOpen(false);
    }).catch(error => {
      console.error("Error editing Owner:",error);
    });
  }
};

const handleDeleteOwner = () => {
  if (selectedOwner) {
    deleteOwner(selectedOwner.owner_id);
    setIsDeleteModalOpen(false);
  }
};

const handleChange = (e) => {
  const {name, value} = e.target;
  setEditOwnerData((prevData) => ({
   ...prevData,
   [name]: value,
  }));
  if(name === 'owner_country'){
    fetchCities(value);
  }
};

const handlePropertyChange = (e) => {
  const selectedOptions = Array.from(e.target.selectedOptions);
  const selectedPropertyIds = selectedOptions.map((option) => parseInt(option.value, 10));

  setEditOwnerData((prevData) => ({
    ...prevData,
    properties: selectedPropertyIds, // Update the properties with selected IDs
  }));
};


  return (
    <div className='py-5 overflow-x-scroll'>
      <table className='text-sm text-gray-600 bg-white border-collapse border border-gray-200'>
        <thead>
          <tr>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">#</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">Owner Name</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">Owner Guardian Name</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">Owner Phone Number</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">Owner Email</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">Owner Memebership Number</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">Owner CNIC</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">Owner Address</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">Owner Country</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">Owner City</th>
            <th className="border text-start px-4 whitespace-nowrap py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {owners.map((owner, index) => (
            <tr key={owner.owner_id}>
              <td className="border px-4 whitespace-nowrap py-2 ">{index + 1}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{owner.owner_name}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{owner.owner_guardian_name}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{owner.owner_phone_number}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{owner.owner_email}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{owner.owner_membership_number}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{owner.owner_cnic}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{owner.owner_address}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{owner.owner_country}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{owner.owner_city}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">
                <button className='text-green-700 px-1' onClick={() => handleOpenViewModal(owner)}><FaEye /></button>
                <button className='text-yellow-600 px-1' onClick={() => handleOpenEditModal(owner)}><FaEdit /></button>
                <button className='text-red-700 px-1' onClick={() => handleOpenDeleteModal(owner)}><FaTrash /></button>
              </td>              
            </tr>
          ))}
        </tbody>
      </table>

      {/* edit owner */}

      <Modal isVisible={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
      <h2 className="text-xl mb-4">Edit Owner</h2>
      <form>
        <div className='grid grid-cols-2 gap-x-2'>
        <div className="mb-4">
        <input
          type="text"
          id="owner_name"
          name="owner_name"
          placeholder="Owner Name"
          value={editOwnerData.owner_name}
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
          value={editOwnerData.owner_guardian_name}
          onChange={handleChange}
          required
          className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
        />
      </div>
      {/* <div className='mb-4'>
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
      </div> */}
      <div className="mb-4">
        <input
          type="tel"
          id="owner_phone_number"
          name="owner_phone_number"
          placeholder="Owner Phone Number"
          value={editOwnerData.owner_phone_number}
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
          value={editOwnerData.password}
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
          value={editOwnerData.owner_email}
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
          placeholder="Owner Memebership Number"
          value={editOwnerData.owner_membership_number}
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
          value={editOwnerData.owner_cnic}
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
          value={editOwnerData.owner_address}
          onChange={handleChange}
          required
          className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
        />
      </div>
      <div className="mb-2">
        <select
          name="owner_country"
          value={editOwnerData.owner_country}
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
          value={editOwnerData.owner_city}
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
          <select
              multiple
              className='w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700'
              id="property"
              value={editOwnerData.properties}
              onChange={handlePropertyChange}
            >
              <option value="">Select Property</option>
              {properties.map((property) => (
                <option key={property.property_id} value={property.property_id}>
                  {`( ${property.block_name?.block_name} ) - ${property.property_type?.property_number}, Joint Number: ${property.property_type?.joint_number}`}
                </option>
              ))}
            </select>

          </div>
      {/* <div className="mb-4">
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
        </div> */}
        </div>
        <button type="button" className="w-auto mt-2 bg-green-700 text-white px-5 py-2 rounded-sm hover:bg-green-600 transition-colors duration-300" onClick={handleEditOwner}>Save</button>
      </form>
      </Modal>


      {/* delete owner */}

      <Modal isVisible={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
          <h2 className="text-xl mb-4">Delete Owner</h2>
          <p>Are you sure you want to delete {selectedOwner?.owner_name}?</p>
          <button type="button" className="mt-4 bg-red-500 text-white px-4 py-2 rounded-sm" onClick={handleDeleteOwner}>Yes, Delete</button>
          <button type="button" className="mt-4 ms-2 bg-green-600 text-white px-4 py-2 rounded-sm" onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
        </Modal>

        {/* view owner */}

        <Modal isVisible={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
          <h2 className="text-xl mb-4">View Owner</h2>
          <p><strong>Owner Name:</strong> {selectedOwner?.owner_name}</p>
          <p><strong>Owner Guardian Name:</strong> {selectedOwner?.owner_guardian_name}</p>          
          <p><strong>Owner Phone Number:</strong> {selectedOwner?.owner_phone_number}</p>
          <p><strong>Owner Email:</strong> {selectedOwner?.owner_email}</p>
          <p><strong>Owner Memebership Number:</strong> {selectedOwner?.owner_membership_number}</p>
          <p><strong>Owner CNIC:</strong> {selectedOwner?.owner_cnic}</p>
          <p><strong>Owner Address:</strong> {selectedOwner?.owner_address}</p>
          <p><strong>Owner Country:</strong> {selectedOwner?.owner_country}</p>
          <p><strong>Owner City:</strong> {selectedOwner?.owner_city}</p>
         
        </Modal>




    </div>
  )
}

export default OwnerList