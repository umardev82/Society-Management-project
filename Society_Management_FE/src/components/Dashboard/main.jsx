import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsGraphUpArrow } from "react-icons/bs";
import { FiMenu, FiBell, FiSearch, FiUser } from "react-icons/fi";
import { BsBank } from "react-icons/bs";
import { TbLogout2 } from "react-icons/tb";
import { FaCubes } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Dashboard from "./dashboard";
import PropertyList from "./property/propertyList";
import AddProperty from "./property/addProperty";


const Main = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <BsGraphUpArrow /> },
    { name: "Property List", icon: <FaCubes/>},
    { name: "Add Property", icon: <FaCubes/>},
    { name: "Logout", icon: <TbLogout2 /> },
  ];

  const handleLogout = () => {
    // Clear user authentication data
    localStorage.removeItem("token"); 
    localStorage.removeItem("user"); 

    // Redirect to login page
    navigate("/");
  };

  const renderContent = () => {
    switch (activeItem) {
      case "Dashboard":
        return <Dashboard/>;
      case "Property List":
        return <PropertyList/>
      case "Add Property":
        return <AddProperty/>
      case "Logout":
        handleLogout(); 
        return null;
      default:
        return <div>Select an option</div>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed z-30 inset-y-0 left-0 w-64 bg-white text-gray-700 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        {/* Sidebar Header */}
        <div className="p-5 border-b flex items-center justify-between h-16 bg-green-700">
          <div className="flex gap-3 items-center justify-center">
            <BsBank className="text-white text-2xl"/>
            <h2 className="font-bold text-white text-2xl">گلِ دامن سوسائٹی</h2> </div>
          <button
            className="md:hidden text-white "
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Sidebar Menu */}
        <ul >
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`py-2 px-4  text-base cursor-pointer  flex items-center gap-2 ${
                activeItem === item.name
                  ? "bg-green-700 text-white"
                  : "hover:bg-green-700 hover:text-white"
              }`}
              onClick={() => setActiveItem(item.name)}
            >
              {item.icon}
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ">
        {/* Header */}
        <div className="w-full bg-green-700 h-16 p-4 flex items-center justify-between border-b shadow">
          {/* Left: Logo and Search */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-white "
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FiMenu size={24} />
            </button>
          
          </div>

          {/* Right: Icons and Profile */}
          <div className="flex items-center gap-6">
            <FiBell size={20} className="text-white cursor-pointer relative">
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </FiBell>
            
            <FiUser size={20} className="text-white cursor-pointer" /> 
            <div className="flex items-center gap-2">
              <div className="hidden md:block">
                <p className="text-sm text-white font-semibold">William</p>
                <p className="text-xs text-white">Super Admin</p>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6 bg-gray-100">
          <h1 className="text-2xl text-gray-700 mb-4">{activeItem}</h1>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Main;
