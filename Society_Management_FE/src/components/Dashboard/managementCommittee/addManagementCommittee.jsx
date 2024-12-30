import React, { useEffect, useState } from 'react';
import useManagementCommittee from '../../../hooks/useManagementCommittee';
import useMemberType from '../../../hooks/useMemberType';

const AddManagementCommittee = () => {
  const [mcData, setMcData] = useState({
    mc_member_type: '',
    mc_name: '',
    mc_guardian_type: '',
    mc_guardian_name: '',
    mc_email: '',
    mc_contact: '',
    mc_pre_address: '',
    mc_per_address: '',
    mc_cnic: '',
    mc_joining_date: '',
    mc_ending_date: '',
    mc_status: 1,
    mc_image: null,
    mc_password: '',
  });

  const {
    fetchManagementCommittee,
    addManagementCommittee,
    successMessage,
    errorMessage,
  } = useManagementCommittee();

  const {memberTypes, fetchMemberTypes} = useMemberType();


  useEffect(() => {
    fetchMemberTypes();
    fetchManagementCommittee();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMcData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setMcData((prevData) => ({
      ...prevData,
      [name]: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const formData = new FormData();
    Object.keys(mcData).forEach((key) => {
     if (mcData[key]) {
     formData.append(key, mcData[key]);
      }
        });

        const handleFileChange = (e) => {
            const { name } = e.target;
            const file = e.target.files[0];
            setMcData((prevData) => ({
              ...prevData,
              [name]: file,
            }));
          };
          


    const success = await addManagementCommittee(formData);
    if (success) {
      setMcData({
        mc_member_type: '',
        mc_name: '',
        mc_guardian_type: '',
        mc_guardian_name: '',
        mc_email: '',
        mc_contact: '',
        mc_pre_address: '',
        mc_per_address: '',
        mc_cnic: '',
        mc_joining_date: '',
        mc_ending_date: '',
        mc_status: 1,
        mc_image: null,
        mc_password: '',
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="py-5" encType="multipart/form-data">
        <div className="grid grid-cols-3 gap-x-2">
          <div className="mb-4">
            <select
              name="mc_member_type"
              value={mcData.mc_member_type}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            >
              <option value="">Select Member Type</option>
              {memberTypes.map((type) => (
                <option key={type.member_type_id} value={type.member_type_id}>
                  {type.member_type_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="mc_name"
              placeholder="Name"
              value={mcData.mc_name}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className="mb-4">
          <select
            name="mc_guardian_type"
            value={mcData.mc_guardian_type}
            onChange={handleChange}
             className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
              >
              <option value="">Select Guardian Type</option>
              <option value="S/O">Son of</option>
              <option value="D/O">Daughter of</option>
              <option value="W/O">Wife of</option>
            </select>
  
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="mc_guardian_name"
              placeholder="Guardian Name"
              value={mcData.mc_guardian_name}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="mc_email"
              placeholder="Email"
              value={mcData.mc_email}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className="mb-4">
            <input
              type="tel"
              name="mc_contact"
              placeholder="Contact Number"
              value={mcData.mc_contact}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className="mb-4">
            <textarea
              name="mc_pre_address"
              placeholder="Present Address"
              value={mcData.mc_pre_address}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className="mb-4">
            <textarea
              name="mc_per_address"
              placeholder="Permanent Address"
              value={mcData.mc_per_address}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="mc_cnic"
              placeholder="CNIC"
              value={mcData.mc_cnic}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className="mb-4">
            <input
              type="date"
              name="mc_joining_date"
              value={mcData.mc_joining_date}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className="mb-4">
            <input
              type="date"
              name="mc_ending_date"
              value={mcData.mc_ending_date}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
          <div className="mb-4">
          <select
            name="mc_status"
            value={mcData.mc_status}
            onChange={handleChange}
             className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
              >
              <option value="">Select Status</option>
              <option value="1">Active</option>
              <option value="0">Expired</option>
            </select>
  
          </div>
          <div className="mb-4">
           <input
        type="file"
        name="mc_image"
        onChange={handleFileChange}
        className="text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none"
      />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="mc_password"
              placeholder="Password"
              value={mcData.mc_password}
              onChange={handleChange}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>
        </div>
        <button
          type="submit"
          className="text-sm text-white py-2 px-4 bg-green-700 hover:bg-green-600 rounded-sm focus:ring-0 focus:outline-none"
        >
          Add Management Committee Member
        </button>
      </form>

      {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default AddManagementCommittee;
