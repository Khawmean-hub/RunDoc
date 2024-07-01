// src/app/users/page.tsx
"use client"
import { useAuth } from '@/app/context/AuthProvider';
import { adminService } from '@/services';
import { TrashIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify'; // For notifications
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles

interface User {
  id: string;
  username: string;
  role: string;
  status: string;
  firstName: string;
  lastName: string;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set());

  const {role} = useAuth()
  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    adminService.getUsers().then(response => {
      setUsers(response.data);
    });
  }

  const deleteUser = (id: string) => {
    if (confirm(`Are you sure you want to delete user ${id}?`)) {
      adminService.deleteUser(id).then(() => {
        toast.success("User deleted successfully!");
        getUsers(); // Refresh the user list after deletion
      }).catch((error) => {
        toast.error("Failed to delete user. Please try again.");
        console.error(error);
      });
    }
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleCheckboxChange = (index: number) => {
    const updatedSelectedUsers = new Set(selectedUsers);
    if (updatedSelectedUsers.has(index)) {
      updatedSelectedUsers.delete(index);
    } else {
      updatedSelectedUsers.add(index);
    }
    setSelectedUsers(updatedSelectedUsers);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        <Link href="/users/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow">
          + New
        </Link>
      </div>
      <div className="flex mb-4">
        <input
          type="text"
          className="border rounded p-2 w-full shadow-sm"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="min-w-full bg-white border rounded shadow-md overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border text-left"></th>
            <th className="py-2 px-4 border text-left">Name</th>
            <th className="py-2 px-4 border text-left">Username</th>
            <th className="py-2 px-4 border text-left">Role</th>
            <th className="py-2 px-4 border text-left">Status</th>
            <th className="py-2 px-4 border text-left"></th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="py-2 px-4 border">
                <input
                  type="checkbox"
                  checked={selectedUsers.has(idx)}
                  onChange={() => handleCheckboxChange(idx)}
                />
              </td>
              <td className="py-2 px-4 border">{`${user.firstName || ''} ${user.lastName || ''}`}</td>
              <td className="py-2 px-4 border">{user.username}</td>
              <td className="py-2 px-4 border">{user.role}</td>
              <td className={`py-2 px-4 border ${user.status === 'active' ? 'text-green-600' : user.status === 'inactive' ? 'text-gray-600' : 'text-red-600'}`}>
                {user.status}
              </td>
              <td className="py-2 px-4 border">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => deleteUser(user.id)}
                >
                  <TrashIcon width={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UsersPage;
