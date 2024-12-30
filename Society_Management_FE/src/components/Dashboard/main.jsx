import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsGraphUpArrow } from "react-icons/bs";
import { FiMenu, FiBell, FiUser } from "react-icons/fi";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { BsBank } from "react-icons/bs";
import { TbLogout2 } from "react-icons/tb";
import { FaCubes, FaCaretDown, FaCaretRight, FaRegClone, FaUser, FaUsers } from "react-icons/fa";
import { FaHouseFloodWaterCircleArrowRight, FaBuilding, FaBuildingColumns } from "react-icons/fa6";
import { GrServices } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import Dashboard from "./dashboard";
import PropertyList from "./property/propertyList";
import AddProperty from "./property/addProperty";
import AddBlock from "./block/addBlock";
import BlockList from "./block/blockList";
import AddAmenity from "./amenity/addAmenity";
import AmenityList from "./amenity/amenityList";
import AddUnitType from "./unitType/addUnitType";
import UnitTypeList from "./unitType/unitTypeList";
import AddPropertyType from "./propertyType/addPropertyType";
import PropertyTypeList from "./propertyType/propertyTypeList";
import OwnerList from "./owner/ownerList";
import AddOwner from "./owner/addOwner";
import AddTenant from "./tenant/addTenant";
import TenantList from "./tenant/tenantList";
import AddService from "./serviceInfo/addService";
import ServiceList from "./serviceInfo/serviceList";
import AddAreaType from "./areaType/addAreaType";
import AreaTypeList from "./areaType/areaTypeList";
import AddMemberType from "./memberType/addMemberType";
import ListMemberType from "./memberType/listMemberType";
import McList from "./maintenanceCost/mcList";
import AddMc from "./maintenanceCost/addMc";
import AddManagementCommittee from "./managementCommittee/addManagementCommittee";
import ManagementCommitteeList from "./managementCommittee/managementCommitteeList";
import BillSetup from "./billSetup/billSetup";
import AddForm from "./formBuilder/addForm";
import FormsList from "./formBuilder/formList";

const Main = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(""); // Main dropdown state
  const [openSubDropdown, setOpenSubDropdown] = useState(""); // Sub-dropdown state
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <BsGraphUpArrow /> },
    {
      name: "Blocks",
      icon: <FaRegClone />,
      subItems: [
        { name: "Block List", icon: <MdKeyboardDoubleArrowRight />, component: <BlockList /> },
        { name: "Add Block", icon: <MdKeyboardDoubleArrowRight />, component: <AddBlock /> },
      ],
    },
    {
      name: "Properties",
      icon: <FaCubes />,
      subItems: [
        { name: "Property List", icon: <MdKeyboardDoubleArrowRight />, component: <PropertyList /> },
        { name: "Add Property", icon: <MdKeyboardDoubleArrowRight />, component: <AddProperty /> },
        {
          name: "Property Type",
          icon: <FaBuildingColumns />,
          subItems: [
            { name: "Property Type List", icon: <MdKeyboardDoubleArrowRight />, component: <PropertyTypeList /> },
            { name: "Add Property Type", icon: <MdKeyboardDoubleArrowRight />, component: <AddPropertyType /> },
          ],
        },
        {
          name: "Unit Type",
          icon: <FaBuilding />,
          subItems: [
            { name: "Unit Type List", icon: <MdKeyboardDoubleArrowRight />, component: <UnitTypeList /> },
            { name: "Add Unit Type", icon: <MdKeyboardDoubleArrowRight />, component: <AddUnitType /> },
          ],
        },
        {
          name: "Amenity",
          icon: <FaHouseFloodWaterCircleArrowRight />,
          subItems: [
            { name: "Amenity List", icon: <MdKeyboardDoubleArrowRight />, component: <AmenityList /> },
            { name: "Add Amenity", icon: <MdKeyboardDoubleArrowRight />, component: <AddAmenity /> },
          ],
        },
      ],
    },
    {
      name: "Owner",
      icon: <FaUser />,
      subItems: [
        { name: "Owner List", icon: <MdKeyboardDoubleArrowRight />, component: <OwnerList /> },
        { name: "Add Owner", icon: <MdKeyboardDoubleArrowRight />, component: <AddOwner /> },
      ],
    },
    {
      name: "Tenant",
      icon: <FaUsers/>,
      subItems: [
         { name: "Add Tenant", icon: <MdKeyboardDoubleArrowRight/>, component: <AddTenant/>},
         { name: "Tenant List", icon: <MdKeyboardDoubleArrowRight/>, component: <TenantList/>},
      ],
    },
    {
      name: "Service",
      icon: <GrServices/>,
      subItems: [
         { name: "Add Service", icon: <MdKeyboardDoubleArrowRight/>, component: <AddService/>},
         { name: "Service List", icon: <MdKeyboardDoubleArrowRight/>, component: <ServiceList/>},
      ],
    },
    {
      name: "Area Type",
      icon: <GrServices/>,
      subItems: [
        {name: "Add Area Type", icon: <MdKeyboardDoubleArrowRight/>, component: <AddAreaType/>},
        {name: "Area Type List", icon: <MdKeyboardDoubleArrowRight/>, component: <AreaTypeList/>},
      ]
    },
    {
      name: "Member Type",
      icon:<FaUser/>,
      subItems:[
        {name: "Add Member Type", icon: <MdKeyboardDoubleArrowRight/>, component: <AddMemberType/>},
        {name: "Member Type List", icon: <MdKeyboardDoubleArrowRight/>, component: <ListMemberType/>},
      ]
    },
    {
      name: "Maintenance Cost",
      icon:<FaUser/>,
      subItems:[
        {name: "Add Maintenance Cost", icon: <MdKeyboardDoubleArrowRight/>, component: <AddMc/>},
        {name: "Maintenance Cost List", icon: <MdKeyboardDoubleArrowRight/>, component: <McList/>},
      ]
    },
    {
      name: "Management Committee",
      icon:<FaUser/>,
      subItems:[
        {name: "Add Management Committee", icon: <MdKeyboardDoubleArrowRight/>, component: <AddManagementCommittee/>},
        {name: "Management Commitee List", icon: <MdKeyboardDoubleArrowRight/>, component: <ManagementCommitteeList/>},
      ]
    },
    {
      name: "Bill Setup",
      icon:<FaUser/>,
      subItems:[
        {name: "Bill Setup", icon: <MdKeyboardDoubleArrowRight/>, component: <BillSetup/>},
       ]
    },
    {
      name: "Form Builder",
      icon:<FaUser/>,
      subItems:[
        {name: "Add Form", icon: <MdKeyboardDoubleArrowRight/>, component: <AddForm/>},
        {name: "Form List", icon: <MdKeyboardDoubleArrowRight/>, component: <FormsList/>},        
       ]
    },
    { name: "Logout", icon: <TbLogout2 /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const renderContent = () => {
    switch (activeItem) {
      case "Dashboard":
        return <Dashboard />;
      case "Property List":
        return <PropertyList />;
      case "Add Property":
        return <AddProperty />;
      case "Add Block":
        return <AddBlock />;
      case "Block List":
        return <BlockList />;
      case "Add Amenity":
        return <AddAmenity />;
      case "Amenity List":
        return <AmenityList />;
      case "Add Unit Type":
        return <AddUnitType />;
      case "Unit Type List":
        return <UnitTypeList />;
      case "Add Property Type":
        return <AddPropertyType />;
      case "Property Type List":
        return <PropertyTypeList />;
      case "Owner List":
        return <OwnerList/>;
      case "Add Owner":
        return <AddOwner/>;
      case "Add Tenant":
        return <AddTenant/>;
      case "Tenant List":
        return <TenantList/>;
      case "Add Service":
        return <AddService/>;
      case "Service List":
        return <ServiceList/>;
      case "Add Area Type":
        return <AddAreaType/>;
      case "Area Type List":
        return <AreaTypeList/>;
      case "Add Member Type":
        return <AddMemberType/>;
      case "Member Type List":
        return  <ListMemberType/>;
      case "Add Maintenance Cost":
        return <AddMc/>;
      case "Maintenance Cost List":
        return <McList/>;
      case "Add Management Committee":
        return <AddManagementCommittee/>;
      case "Management Commitee List":
        return <ManagementCommitteeList/>;
      case "Bill Setup":
        return <BillSetup/>;
      case "Add Form":
        return <AddForm/>;
      case "Form List":
        return <FormsList/>;
      case "Logout":
        handleLogout();
        return null;
      default:
        return <div>Select an option</div>;
    }
  };

  const handleDropdownToggle = (name) => {
    setOpenDropdown(openDropdown === name ? "" : name);
    setOpenSubDropdown(""); // Close sub-dropdown when switching main dropdown
  };

  const handleSubDropdownToggle = (name) => {
    setOpenSubDropdown(openSubDropdown === name ? "" : name);
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <div
        className={`fixed z-30 inset-y-0 left-0 md:w-1/5 bg-white text-gray-700 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <div className="p-5 border-b flex items-center justify-between h-16 bg-green-700">
          <div className="flex gap-3 items-center justify-center">
            <BsBank className="text-white text-2xl" />
            <h2 className="font-bold text-white text-2xl">گلِ دامن سوسائٹی</h2>
          </div>
          <button className="md:hidden text-white" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <IoMdClose size={24} />
          </button>
        </div>
        
        <ul>
          {menuItems.map((item) => (
            <div key={item.name}>
              <li
                className={`py-2 px-4 text-base cursor-pointer  flex items-center justify-between ${
                  (activeItem === item.name && !item.subItems) || openDropdown === item.name
                    ? "bg-green-700 text-white border-s-2  border-orange-600"
                    : "hover:bg-green-700 hover:border-s-2 hover:border-orange-600 hover:text-white"
                }`}
                onClick={() =>
                  item.subItems ? handleDropdownToggle(item.name) : setActiveItem(item.name)
                }
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  {item.name}
                </div>
                {item.subItems && <span>{openDropdown === item.name ? <FaCaretDown /> : <FaCaretRight />}</span>}
              </li>
              {item.subItems && openDropdown === item.name && (
                <ul className="transition-all duration-300 ease-in-out">
                  {item.subItems.map((subItem) => (
                    <div key={subItem.name}>
                      <li
                        className={`py-2 px-4 text-base cursor-pointer  flex items-center gap-2 ${
                          activeItem === subItem.name && !subItem.subItems ? "bg-slate-50 text-black" : ""
                        }`}
                        onClick={() =>
                          subItem.subItems ? handleSubDropdownToggle(subItem.name) : setActiveItem(subItem.name)
                        }
                      >
                        {subItem.icon}
                        {subItem.name}
                        {subItem.subItems && (
                          <span>{openSubDropdown === subItem.name ? <FaCaretDown /> : <FaCaretRight />}</span>
                        )}
                      </li>
                      {subItem.subItems && openSubDropdown === subItem.name && (
                        <ul className=" transition-all duration-300 ease-in-out">
                          {subItem.subItems.map((nestedItem) => (
                            <li
                              key={nestedItem.name}
                              className={`py-2 ps-8 text-base cursor-pointer flex items-center border-b-slate-300 border-b gap-2 ${
                                activeItem === nestedItem.name ? " bg-slate-100  text-black" : ""
                              }`}
                              onClick={() => setActiveItem(nestedItem.name)}
                            >
                              {nestedItem.icon}
                              {nestedItem.name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:w-4/5">
        <div className="w-full bg-green-700 h-16 p-4 flex items-center justify-between border-b shadow">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-white" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <FiMenu size={24} />
            </button>
          </div>
          <div className="flex items-center gap-6">
            <FiBell className="text-white" size={24} /> <FiUser className="text-white" size={24} /> 
            </div> 
            </div> 
            <div className="flex-1 p-7 bg-slate-50">
              <h1 className="text-2xl font-bold">{activeItem}</h1>
               {renderContent()} 
              </div> 
              </div> 
              </div>
               ); };

            export default Main;
