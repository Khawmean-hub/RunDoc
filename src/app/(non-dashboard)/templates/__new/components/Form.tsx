// src/components/FormTab.tsx
import React from 'react';

const FormTab: React.FC = () => {
  return (
    <div className="p-4 shadow mt-4">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Type : AAABBBCCC</h3>
        </div>
      </div>
      <div className="bg-white shadow sm:rounded-lg mt-4 p-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Untitled Question</label>
          <input
            type="text"
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder="Short Answer"
          />
        </div>
        <div className="mt-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Add New
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormTab;
