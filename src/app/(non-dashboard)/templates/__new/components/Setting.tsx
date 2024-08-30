// src/components/SettingsTab.tsx
import React from 'react';

const SettingsTab: React.FC = () => {
  return (
    <div className="p-4 shadow mt-4">
      <div className="bg-white shadow sm:rounded-lg p-4">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Settings</h3>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Setting 1</label>
          <input
            type="text"
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder="Setting 1 value"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Setting 2</label>
          <input
            type="text"
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder="Setting 2 value"
          />
        </div>
        <div className="mt-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
