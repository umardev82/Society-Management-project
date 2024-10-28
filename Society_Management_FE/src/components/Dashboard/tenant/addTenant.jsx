import React, { useEffect, useState } from 'react';
import useTenant from '../../../hooks/useTenant';

const AddTenant = () => {
  const [tenantData, setTenantData] = useState({
    tenant_name: '',
        tenant_guardian_name: '',
        tenant_profile_picture: '',
        tenant_phone_number: '',
        password: '',
        tenant_email: '',
        tenant_cnic: '',
        tenant_address: '',
        tenant_country: '',
        tenant_city: '',
        starting_date: '',
        ending_agreement_date: '',
        monthly_rent: '',
        security_payment: '',
        other_monthly_utility_charges: '',
        assign_property: '',
        agreement_attachment: '',    
  });

  const { countries, cities, fetchCities, fetchTenants, addTenant, successMessage, errorMessage } = useTenant();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTenantData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'tenant_country') {
      fetchCities(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(tenantData).forEach((key) => {
      if (key !== 'document_attachment') {
        formData.append(key, tenantData[key]);
      }
    });
    
    if (tenantData.document_attachment) {
      formData.append('document_attachment', tenantData.document_attachment);
    }

    const success = await addTenant(formData);
    
    if (success) {
      successMessage('Tenant added successfully!');
      setTenantData({
        tenant_name: '',
        tenant_guardian_name: '',
        tenant_profile_picture: '',
        tenant_phone_number: '',
        password: '',
        tenant_email: '',
        tenant_cnic: '',
        tenant_address: '',
        tenant_country: '',
        tenant_city: '',
        starting_date: '',
        ending_agreement_date: '',
        monthly_rent: '',
        security_payment: '',
        other_monthly_utility_charges: '',
        assign_property: '',
        agreement_attachment: '',        
      });
     
    }
  };

  return (
    <>
      <form className='py-5' onSubmit={handleSubmit}>
        <div className='grid grid-cols-3 gap-x-2'>
          <div className="mb-4">
            <input
              type="text"
              id="tenant_name"
              name="tenant_name"
              placeholder="Tenant Name"
              value={tenantData.tenant_name}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="tenant_guardian_name"
              name="tenant_guardian_name"
              placeholder="Tenant Guardian Name"
              value={tenantData.tenant_guardian_name}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className='mb-4'>
            <input
              type="file"
              id="tenant_profile_picture"
              name="tenant_profile_picture"
              onChange={(e) =>
                setTenantData({
                  ...tenantData,
                  tenant_profile_picture: e.target.files[0],
                })
              }
              className="text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
              accept=".pdf,.doc,.docx,.jpg,.png"
            />
          </div>
          <div className="mb-4">
            <input
              type="tel"
              id="tenant_phone_number"
              name="tenant_phone_number"
              placeholder="Tenant Phone Number"
              value={tenantData.tenant_phone_number}
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
              value={tenantData.password}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="tenant_email"
              name="tenant_email"
              placeholder="Tenant Email"
              value={tenantData.tenant_email}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="tenant_cnic"
              name="tenant_cnic"
              placeholder="Tenant CNIC"
              value={tenantData.tenant_cnic}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="tenant_address"
              name="tenant_address"
              placeholder="Tenant Address"
              value={tenantData.tenant_address}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className="mb-2">
            <select
              name="tenant_country"
              value={tenantData.tenant_country}
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
              value={tenantData.tenant_city}
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
              id="agreement_attachment"
              name="agreement_attachment"
              onChange={(e) =>
                setTenantData({
                  ...tenantData,
                  agreement_attachment: e.target.files[0],
                })
              }
              className="mt-1 text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
              accept=".pdf,.doc,.docx,.jpg,.png"
            />
          </div>
          <div className="mb-4">
            <select
              className='w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700'
              id="assign_property"
              name="assign_property"
              value={tenantData.assign_property}
              onChange={handleChange}
            >
              <option value="">Select Property</option>
              {properties.map((property) => (
                <option key={property.property_id} value={property.property_id}>
                  {`( ${property.block_name?.block_name} ) - ${property.property_type?.property_number}, Joint Number: ${property.property_type?.joint_number}`}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <input
              type="date"
              id="starting_date"
              name="starting_date"
              placeholder="Starting Date"
              value={tenantData.starting_date}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className="mb-4">
            <input
              type="date"
              id="ending_agreement_date"
              name="ending_agreement_date"
              placeholder="Ending Agreement Date"
              value={tenantData.ending_agreement_date}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              id="monthly_rent"
              name="monthly_rent"
              placeholder="Monthly Rent"
              value={tenantData.monthly_rent}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              id="security_payment"
              name="security_payment"
              placeholder="Security Payment"
              value={tenantData.security_payment}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              id="other_monthly_utility_charges"
              name="other_monthly_utility_charges"
              placeholder="Other Monthly Utility Charges"
              value={tenantData.other_monthly_utility_charges}
              onChange={handleChange}
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-auto bg-green-700 text-white px-5 py-2 rounded-sm hover:bg-green-600 transition-colors duration-300"
        >
          Add Tenant
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

export default AddTenant;
