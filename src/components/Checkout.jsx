import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';


function Checkout() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-gray-700 mb-4">Checkout Page</h1>
        <p className="text-lg text-gray-600 mb-6">This page is currently under construction. Please check back later.</p>
        <div className="flex justify-center">
          <div className="flex items-center gap-2 text-gray-500">
            <span><FontAwesomeIcon icon={faScrewdriverWrench} /></span>
            <span>Under Construction</span>
          </div>
        </div>
        <p className="text-gray-500 mt-6">
          Meanwhile, feel free to browse other parts of our site!
        </p>
      </div>
    </div>
  );
}

export default Checkout;
