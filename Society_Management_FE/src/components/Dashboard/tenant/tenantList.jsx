import React, {useState, useEffect} from 'react';
import useTenant from '../../../hooks/useTenant';
import Modal from '../modal';
import { FaEdit, FaTrash, FaEye} from 'react-icons/fa';

const TenantList = () => {
  const {countries, cities, fetchCities, tenants, deleteTenant, editTenant, fetchTenants, loading, error } = useTenant();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [editTenantData, setEditTenantData] = useState({});
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await fetch('http://127.0.0.1:8000/property_info/'); // Replace with your API endpoint
      const data = await response.json();
      setProperties(data);
    };

    fetchProperties();
    fetchTenants();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading tenants: {error.message}</div>
  }

  const handleOpenEditModal = (tenant) => {
    setSelectedTenant(tenant);
    setEditTenantData({
      tenant_name: tenant.tenant_name,
      tenant_guardian_name: tenant.tenant_guardian_name,
      tenant_profile_picture: tenant.tenant_profile_picture,
      tenant_phone_number: tenant.tenant_phone_number,
      password: tenant.password,
      tenant_email: tenant.tenant_email,
      tenant_cnic: tenant.tenant_cnic,
      tenant_address: tenant.tenant_address,
      tenant_country: tenant.tenant_country,
      tenant_city: tenant.tenant_city,
      starting_date: tenant.starting_date,
      ending_agreement_date: tenant.ending_agreement_date,
      monthly_rent: tenant.monthly_rent,
      security_payment: tenant.security_payment,
      other_monthly_utility_charges: tenant.other_monthly_utility_charges,
      assign_property: tenant.assign_property?.property_id,
      agreement_attachment: tenant.agreement_attachment,   
    });
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (tenant) => {
    setSelectedTenant(tenant);
    setIsDeleteModalOpen(true);
  };

  const handleOpenViewModal = (tenant) => {
    setSelectedTenant(tenant);
    setIsViewModalOpen(true);
  };

  const handleEditTenant = () => {
    if (selectedTenant) {
      editTenant(selectedTenant.tenant_id,editTenantData).then(() => {
        fetchTenants();
        setIsEditModalOpen(false);
      }).catch( error => {
         console.error("Error editing Tenant:", error);
      });
    }
  };

  const handleDeleteTenant = () => {
  if (selectedTenant) {
    deleteTenant(selectedTenant.tenant_id);
    setIsDeleteModalOpen(false);
  }
  };

const handleChange = (e) => {
   const {name, value} = e.target;
   setEditTenantData((prevData) => (
    {
      ...prevData,
      [name]: value,
    }
   ));
   if(name === 'tenant_country'){
    fetchCities(value);
   }
};

  return (
    <div className='py-5 overflow-x-scroll'>
      <table className='text-sm text-gray-600 bg-white border-collapse border border-gray-200'>
        <thead>
          <tr>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">#</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">Tenant Name</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">Tenant Guardian Name</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">Tenant Phone Number</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">Tenant Email</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">Tenant CNIC</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">Tenant Address</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">Tenant City</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">Tenant Country</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">Starting Date</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">Ending Agreement Date</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">Monthly Rent</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">Security Payment</th>
            <th className="border text-start px-4 whitespace-nowrap py-2 ">Other Monthly Utility Charges</th>
            <th className="border text-start px-4 whitespace-nowrap py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            tenants.map((tenant, index) => (
            <tr key={tenant.tenant_id}>
              <td className="border px-4 whitespace-nowrap py-2 ">
                {index + 1}
              </td>
              <td className="border px-4 whitespace-nowrap py-2 ">{tenant.tenant_name}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{tenant.tenant_guardian_name}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{tenant.tenant_phone_number}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{tenant.tenant_email}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{tenant.tenant_cnic}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{tenant.tenant_address}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{tenant.tenant_country}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{tenant.tenant_city}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{tenant.starting_date}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{tenant.ending_agreement_date}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{tenant.monthly_rent}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{tenant.security_payment}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">{tenant.other_monthly_utility_charges}</td>
              <td className="border px-4 whitespace-nowrap py-2 ">
                <button className='text-green-700 px-1' onClick={() => handleOpenViewModal(tenant)}><FaEye /></button>
                <button className='text-yellow-600 px-1' onClick={() => handleOpenEditModal(tenant)}><FaEdit /></button>
                <button className='text-red-700 px-1' onClick={() => handleOpenDeleteModal(tenant)}><FaTrash /></button>
              </td>                  
            </tr>
            ))}
        </tbody>
      </table>

    {/* edit tenant */}
    <Modal isVisible={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
      <h2 className="text-xl mb-4">Edit Tenant</h2>
      <form>
        <div className='grid grid-cols-2 gap-x-2'>
          <div className='mb-4'>
            <input 
            type='text'
            id='tenant_name'
            name='tenant_name'
            placeholder='Tenant Name'
            value={editTenantData.tenant_name}
            onChange={handleChange}
            required
             className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className='mb-4'>
            <input 
            type='text'
            id='tenant_name'
            name='tenant_name'
            placeholder='Tenant Name'
            value={editTenantData.tenant_name}
            onChange={handleChange}
            required
             className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className='mb-4'>
            <input 
            type='text'
            id='tenant_guardian_name'
            name='tenant_guardian_name'
            placeholder='Tenant Guardian Name'
            value={editTenantData.tenant_guardian_name}
            onChange={handleChange}
            required
             className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className='mb-4'>
            <input 
            type='text'
            id='tenant_phone_number'
            name='tenant_phone_number'
            placeholder='Tenant Phone Number'
            value={editTenantData.tenant_phone_number}
            onChange={handleChange}
            required
             className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className='mb-4'>
            <input 
            type='text'
            id='password'
            name='password'
            placeholder='Tenant Password'
            value={editTenantData.password}
            onChange={handleChange}
            required
             className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className='mb-4'>
            <input 
            type='text'
            id='tenant_email'
            name='tenant_email'
            placeholder='Tenant Email'
            value={editTenantData.tenant_email}
            onChange={handleChange}
            required
             className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className='mb-4'>
            <input 
            type='text'
            id='tenant_cnic'
            name='tenant_cnic'
            placeholder='Tenant CNIC'
            value={editTenantData.tenant_cnic}
            onChange={handleChange}
            required
             className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className='mb-4'>
            <input 
            type='text'
            id='tenant_address'
            name='tenant_address'
            placeholder='Tenant Address'
            value={editTenantData.tenant_address}
            onChange={handleChange}
            required
             className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className='mb-4'>
            <input 
            type='tel'
            id='tenant_phone_number'
            name='tenant_phone_number'
            placeholder='Tenant Phone Number'
            value={editTenantData.tenant_phone_number}
            onChange={handleChange}
            required
             className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className="mb-4">
            <select
              className='w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700'
              id="assign_property"
              name="assign_property"
              value={editTenantData.assign_property}
              onChange={handleChange}
            >
              <option value="">Select Property</option>
              {properties.map((property) => (
                <option key={property.property_id} value={property.property_id.toString()}>
                  {`( ${property.block_name?.block_name} ) - ${property.property_type?.property_number}, Joint Number: ${property.property_type?.joint_number}`}
                </option>
              ))}
            </select>
          </div>
          <div className='mb-4'>
              <input 
                type='date'
                name='starting_date'
                placeholder='Starting Date'
                value={editTenantData.starting_date}
                onChange={handleChange}
                required
                className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
              />
            </div>
            <div className='mb-4'>
              <input 
                type='date'
                name='ending_agreement_date'
                placeholder='Ending Agreement Date'
                value={editTenantData.ending_agreement_date}
                onChange={handleChange}
                required
                className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
              />
            </div>
            <div className="mb-4">
              <select
                name="tenant_country"
                value={editTenantData.tenant_country}
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
            <div className="mb-4">
              <select
                name="tenant_city"
                value={editTenantData.tenant_city}
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
            <div className='mb-4'>
              <input 
                type='number'
                name='monthly_rent'
                placeholder='Monthly Rent'
                value={editTenantData.monthly_rent}
                onChange={handleChange}
                required
                className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
              />
            </div>
        </div>
        <button type="button" className="w-auto mt-2 bg-green-700 text-white px-5 py-2 rounded-sm hover:bg-green-600 transition-colors duration-300" onClick={handleEditTenant}>Save</button>
      </form>
    </Modal>




      {/* delete tenant */}

      <Modal isVisible={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
          <h2 className="text-xl mb-4">Delete Tenant</h2>
          <p>Are you sure you want to delete {selectedTenant?.tenant_name}?</p>
          <button type="button" className="mt-4 bg-red-500 text-white px-4 py-2 rounded-sm" onClick={handleDeleteTenant}>Yes, Delete</button>
          <button type="button" className="mt-4 ms-2 bg-green-600 text-white px-4 py-2 rounded-sm" onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
        </Modal>

       {/* view tenant */}

          <Modal isVisible={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
          <h2 className="text-xl mb-4">View Tenant</h2>
          <p><strong>Tenant Name:</strong> {selectedTenant?.tenant_name}</p>
          <p><strong>Tenant Guardian Name:</strong> {selectedTenant?.tenant_guardian_name}</p>          
          <p><strong>Tenant Phone Number:</strong> {selectedTenant?.tenant_phone_number}</p>
          <p><strong>Tenant Email:</strong> {selectedTenant?.tenant_email}</p>
          <p><strong>Owner CNIC:</strong> {selectedTenant?.tenant_cnic}</p>
          <p><strong>Tenant Address:</strong> {selectedTenant?.tenant_address}</p>
          <p><strong>Tenant Country:</strong> {selectedTenant?.tenant_country}</p>
          <p><strong>Tenant City:</strong> {selectedTenant?.tenant_city}</p>
          <p><strong>Starting Date:</strong> {selectedTenant?.starting_date}</p>
          <p><strong>Ending Agreement Date:</strong> {selectedTenant?.ending_agreement_date}</p>
          <p><strong>Monthly Rent:</strong> {selectedTenant?.monthly_rent}</p>
          <p><strong>Security Payment:</strong> {selectedTenant?.security_payment}</p>
          <p><strong>Other Monthly Utility Charges:</strong> {selectedTenant?.other_monthly_utility_charges}</p>
         
        </Modal>

      



    </div>
  )
}

export default TenantList