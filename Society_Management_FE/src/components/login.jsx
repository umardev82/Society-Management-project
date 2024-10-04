import React, { useState } from 'react';
import useAuth from '../hooks/useAuth'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const { login, loading, error } = useAuth(); 
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(phone, password, role);
      console.log('Login successful:', data);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err.message); 
    }
  };

  return (
    <div className='authentication min-h-screen flex flex-col justify-center items-center'>
      <h1 className='text-white text-3xl mb-4'>گلِ دامن سوسائٹی</h1>
      <h2 className='text-white text-xl mb-4'>مینجمنٹ اکاؤنٹ گروپ آفیسر کوآپریٹو سوسائٹی</h2>
      <div className="w-full max-w-sm bg-white rounded-md border border-white">
        <div className='bg-green-700 p-3 rounded-t-md'>
          <h5 className="font-medium text-white">Enter Login Details</h5>
        </div>

        <form onSubmit={handleLogin} className='p-5'>
          <div className="mb-4">
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-md focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-md focus:ring-0 focus:outline-none focus:border-green-700"
            />
          </div>

          <div className="mb-6">
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-md focus:ring-0 focus:outline-none focus:border-green-700"
            >
              <option value="" disabled>Select your role</option>
              <option value="renter">Renter</option>
              <option value="owner">Owner</option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {error && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
