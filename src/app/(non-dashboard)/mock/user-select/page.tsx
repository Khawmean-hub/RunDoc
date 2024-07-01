"use client"
import React, { useState, useEffect, ChangeEvent } from 'react';
import { ChevronDown, ChevronRight, Search, XCircle } from 'lucide-react';

// Types
interface Department {
    id: string;
    name: string;
    organization: {
        id: string;
        name: string;
    };
    parent_department: Department | null;
    child_departments: Department[];
    created_at: string;
    updated_at: string;
}

interface User {
    id: number;
    name: string;
    departmentId: string;
}

// Mock Data
const departmentData: Department[] = [
    {
        "id": "1",
        "name": "Corporate Headquarters",
        "organization": {
            "id": "org1",
            "name": "Global Corp"
        },
        "parent_department": null,
        "child_departments": [
            {
                "id": "2",
                "name": "Human Resources",
                "organization": {
                    "id": "org1",
                    "name": "Global Corp"
                },
                "parent_department": {
                    "id": "1",
                    "name": "Corporate Headquarters",
                    "organization": {
                        "id": "org1",
                        "name": "Global Corp"
                    }
                } as Department,
                "child_departments": [
                    {
                        "id": "4",
                        "name": "Recruitment",
                        "organization": {
                            "id": "org1",
                            "name": "Global Corp"
                        },
                        "parent_department": {
                            "id": "2",
                            "name": "Human Resources",
                            "organization": {
                                "id": "org1",
                                "name": "Global Corp"
                            }
                        } as Department,
                        "child_departments": [],
                        "created_at": "2024-06-24T12:00:00",
                        "updated_at": "2024-06-24T12:00:00"
                    }
                ],
                "created_at": "2024-06-24T12:00:00",
                "updated_at": "2024-06-24T12:00:00"
            },
            {
                "id": "3",
                "name": "Finance",
                "organization": {
                    "id": "org1",
                    "name": "Global Corp"
                },
                "parent_department": {
                    "id": "1",
                    "name": "Corporate Headquarters",
                    "organization": {
                        "id": "org1",
                        "name": "Global Corp"
                    }
                } as Department,
                "child_departments": [],
                "created_at": "2024-06-24T12:00:00",
                "updated_at": "2024-06-24T12:00:00"
            }
        ],
        "created_at": "2024-06-24T12:00:00",
        "updated_at": "2024-06-24T12:00:00"
    },
    // ... other departments
];

const userData: User[] = [
    { id: 1, name: "John Doe", departmentId: "1" },
    { id: 2, name: "Jane Smith", departmentId: "2" },
    { id: 3, name: "Alice Johnson", departmentId: "3" },
    { id: 4, name: "Bob Brown", departmentId: "4" },
    { id: 5, name: "Eve Davis", departmentId: "2" },
];

// Utility Functions
const filterDepartments = (departments: Department[], searchTerm: string): Department[] => {
    return departments.filter(dept =>
        dept.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
};

// Components
const SearchBar: React.FC<{ searchTerm: string; setSearchTerm: (term: string) => void }> = ({ searchTerm, setSearchTerm }) => (
    <div className="relative">
        <input
            type="text"
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="w-full p-3 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    </div>
);

const DepartmentList: React.FC<{
    departments: Department[];
    expandedDepts: Record<string, boolean>;
    toggleExpand: (id: string) => void;
    selectedDeptId: string | null;
    handleDeptSelect: (id: string) => void;
}> = ({ departments, expandedDepts, toggleExpand, selectedDeptId, handleDeptSelect }) => {
    const renderDepartment = (dept: Department, level: number = 0) => (
        <div key={dept.id} className={`transition-all duration-200 ease-in-out ${level > 0 ? 'ml-6' : ''}`}>
            <div
                className={`flex items-center py-2 px-3 rounded-lg cursor-pointer ${selectedDeptId === dept.id ? 'bg-blue-100' : 'hover:bg-gray-100'} transition-colors duration-150`}
                onClick={() => handleDeptSelect(dept.id)}
            >
                {dept.child_departments.length > 0 && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(dept.id);
                        }}
                        className="mr-2 p-1 rounded-full hover:bg-gray-200 transition-colors duration-150"
                    >
                        {expandedDepts[dept.id]
                            ? <ChevronDown size={18} className="text-gray-600" />
                            : <ChevronRight size={18} className="text-gray-600" />
                        }
                    </button>
                )}
                <span className="text-gray-800 font-medium">{dept.name}</span>
            </div>
            {expandedDepts[dept.id] && (
                <div className="mt-1 ml-2 pl-4 border-l border-gray-200">
                    {dept.child_departments.map(child => renderDepartment(child, level + 1))}
                </div>
            )}
        </div>
    );

    return (
        <div className="space-y-2 mt-4">
            {departments.map(dept => renderDepartment(dept))}
        </div>
    );
};

const UserList: React.FC<{
    users: User[];
    selectedDeptId: string | null;
    handleUserSelect: (user: User) => void;
}> = ({ users, selectedDeptId, handleUserSelect }) => (
    <div className="space-y-2">
        {selectedDeptId && users.filter(user => user.departmentId === selectedDeptId).map(user => (
            <div
                key={user.id}
                className="flex items-center justify-between p-2 border rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-150"
                onClick={() => handleUserSelect(user)}
            >
                <span>{user.name}</span>
                <button className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-150">
                    <ChevronRight size={18} className="text-gray-600" />
                </button>
            </div>
        ))}
        {!selectedDeptId && (
            <p className="text-gray-600">Select a department to view users.</p>
        )}
    </div>
);

const SelectedUserList: React.FC<{
    selectedUsers: User[];
    handleUserRemove: (userId: number) => void;
}> = ({ selectedUsers, handleUserRemove }) => (
    <div className="mt-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Selected Users</h2>
        <div className="space-y-2">
            {selectedUsers.map(user => (
                <div
                    key={user.id}
                    className="flex items-center justify-between p-2 border rounded-lg bg-blue-50"
                >
                    <span>{user.name}</span>
                    <button onClick={() => handleUserRemove(user.id)} className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-150">
                        <XCircle size={18} className="text-gray-600" />
                    </button>
                </div>
            ))}
        </div>
    </div>
);

// Main Component
const DepartmentTree: React.FC = () => {
    const [expandedDepts, setExpandedDepts] = useState<Record<string, boolean>>({});
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredDepts, setFilteredDepts] = useState<Department[]>(departmentData);
    const [selectedDeptId, setSelectedDeptId] = useState<string | null>(null);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

    useEffect(() => {
        setFilteredDepts(filterDepartments(departmentData, searchTerm));
    }, [searchTerm]);

    const toggleExpand = (id: string) => {
        setExpandedDepts(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleDeptSelect = (id: string) => {
        setSelectedDeptId(id);
    };

    const handleUserSelect = (user: User) => {
        if (!selectedUsers.some(u => u.id === user.id)) {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    const handleUserRemove = (userId: number) => {
        setSelectedUsers(selectedUsers.filter(u => u.id !== userId));
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-lg flex space-x-6">
            <div className="w-1/2 space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Department Structure</h2>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <DepartmentList
                    departments={filteredDepts}
                    expandedDepts={expandedDepts}
                    toggleExpand={toggleExpand}
                    selectedDeptId={selectedDeptId}
                    handleDeptSelect={handleDeptSelect}
                />
            </div>
            <div className="w-1/2 space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Users</h2>
                <UserList
                    users={userData}
                    selectedDeptId={selectedDeptId}
                    handleUserSelect={handleUserSelect}
                />
                <SelectedUserList
                    selectedUsers={selectedUsers}
                    handleUserRemove={handleUserRemove}
                />
            </div>
        </div>
    );
};

export default DepartmentTree;