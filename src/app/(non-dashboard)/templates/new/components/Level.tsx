// src/LevelManagement.tsx
import React from 'react';

interface Level {
  levelNo: number;
  levelName: string;
  remark: string;
  status: string;
  userAccess: string;
}

const levels: Level[] = [
  {
    levelNo: 1,
    levelName: "IN/OUT officer",
    remark: "check for IN Stamp",
    status: "Active",
    userAccess: "User AA, User BB and 30 mores."
  },
  {
    levelNo: 2,
    levelName: "Office AA",
    remark: "First AA",
    status: "Active",
    userAccess: "User AA, User BB and 30 mores."
  },
  {
    levelNo: 3,
    levelName: "Office BBB",
    remark: "First BBB",
    status: "Active",
    userAccess: "User AA, User BB and 30 mores."
  }
];

const LevelManagement: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Level Management</h1>
        <button className="bg-red-500 text-white px-4 py-2 rounded">New Level</button>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Level No</th>
            <th className="py-2 px-4 border">Level Name</th>
            <th className="py-2 px-4 border">Remark</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">User Access</th>
          </tr>
        </thead>
        <tbody>
          {levels.map(level => (
            <tr key={level.levelNo}>
              <td className="py-2 px-4 border">{level.levelNo}</td>
              <td className="py-2 px-4 border">{level.levelName}</td>
              <td className="py-2 px-4 border">{level.remark}</td>
              <td className="py-2 px-4 border">
                <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-xs">{level.status}</span>
              </td>
              <td className="py-2 px-4 border">{level.userAccess}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LevelManagement;
