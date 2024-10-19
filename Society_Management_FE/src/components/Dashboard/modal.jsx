import React from 'react'


const Modal = ({ isVisible, onClose, children }) => {
    if (!isVisible) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
        <div className="bg-white relative p-4 rounded-md shadow-lg w-full max-w-lg">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 mt-4 mr-4 text-gray-600"
          >
            X
          </button>
          {children}
        </div>
      </div>
    );
  };
  

export default Modal

