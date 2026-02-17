import React from "react";
import { RxCross2 } from "react-icons/rx";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative max-w-md w-full">
       
        <button
          onClick={onClose}
          className="absolute top-40 right-8 rounded-full bg-white shadow-md p-3 text-black hover:bg-gray-200 z-50"
        >
          <RxCross2 size={15}/>
        </button>

        
        {children}
      </div>
    </div>
  );
};

export default Modal;
