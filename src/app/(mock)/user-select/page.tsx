"use client"
import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { X, ChevronRight, ChevronDown, Search, User } from 'lucide-react';
import { departmentService } from '@/services';

interface Department {
  id: string;
  name: string;
  ancestor_ids: string[];
  isOrganization: boolean | null;
  total_employee: number;
  parentId: string | null;
  hierarchyString: string;
}

interface UserData {
  id: string;
  name: string;
  department: string;
  jobTitle: string;
  employeeNumber: string;
}

const mockUsers: UserData[] = [
  { id: '1', name: 'John Doe', department: '66925c8d0964ea49123a1504', jobTitle: 'B2B Developer', employeeNumber: '3021' },
  { id: '2', name: 'Jane Smith', department: '668f9bbcaeda253f558f6828', jobTitle: 'Accountant', employeeNumber: '6082' },
  // Add more mock users as needed
];

const UserSelectionDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedDepartments, setExpandedDepartments] = useState<string[]>(['668f8ca43723312e5d89fc7a']);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  // Fetch departments from server (mock for now)
  React.useEffect(() => {
    listDepartments()
  }, []);

  function listDepartments() {
    departmentService.list().then(response => {
      setDepartments(response.data)
    })

  }

  const filteredUsers = useMemo(() => {
    return mockUsers.filter(user =>
      (selectedDepartment ? user.department === selectedDepartment : true) &&
      (searchTerm ?
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.employeeNumber.includes(searchTerm)
        : true)
    );
  }, [selectedDepartment, searchTerm]);

  const toggleDepartmentExpansion = (deptId: string) => {
    setExpandedDepartments(prev =>
      prev.includes(deptId) ? prev.filter(id => id !== deptId) : [...prev, deptId]
    );
  };

  const toggleDepartmentSelection = (deptId: string) => {
    setSelectedDepartment(prev => prev === deptId ? null : deptId);
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const selectAllUsers = () => {
    const allUserIds = filteredUsers.map(user => user.id);
    setSelectedUsers(allUserIds);
  };

  const renderDepartment = (dept: Department, level: number = 0) => {
    const childDepartments = departments.filter(d => d.parentId === dept.id);
    const isExpanded = expandedDepartments.includes(dept.id);
    const hasChildren = childDepartments.length > 0;

    return (
      <div key={dept.id} className={`${level > 0 ? 'ml-4' : ''}`}>
        <div
          className={`flex items-center py-2 px-2 cursor-pointer hover:bg-gray-50 transition-colors duration-150 ease-in-out ${selectedDepartment === dept.id ? 'bg-blue-50' : ''
            }`}
          onClick={() => {
            toggleDepartmentSelection(dept.id);
            if (hasChildren) {
              toggleDepartmentExpansion(dept.id);
            }
          }}
        >
          {hasChildren && (
            <span className="mr-1 text-gray-400">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </span>
          )}
          {!hasChildren && <span className="w-5"></span>}
          <span className={`text-sm ${selectedDepartment === dept.id ? 'font-medium text-blue-600' : 'text-gray-700'}`}>
            {dept.name}
          </span>
          <span className="ml-auto text-xs text-gray-400">
            {dept.total_employee}
          </span>
        </div>
        {hasChildren && isExpanded && (
          <div className="mt-1 border-l border-gray-200">
            {childDepartments.map(child => renderDepartment(child, level + 1))}
          </div>
        )}
      </div>
    );
  };


  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="bg-gray-600 text-white hover:bg-gray-700 text-sm">Open User Selection</Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
          <DialogHeader className="px-6 py-4 bg-gray-50 border-b">
            <DialogTitle className="text-lg font-bold text-gray-800">User Selection</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          <div className="p-6">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users by name, department, job title, or employee number"
                className="pl-10 pr-10 py-2 border-gray-300 rounded-full focus:ring-gray-500 focus:border-gray-500 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchTerm('')}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            {selectedUsers.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6 p-3 bg-gray-50 rounded-lg">
                {selectedUsers.map(userId => {
                  const user = mockUsers.find(u => u.id === userId);
                  return (
                    <div key={userId} className="flex items-center bg-white rounded-full px-3 py-1 shadow-sm border border-gray-200">
                      <span className="text-xs font-medium text-gray-700">{user?.jobTitle}</span>
                      <span className="ml-2 text-xs text-gray-600">{user?.name}</span>
                      <span className="ml-2 text-xs text-gray-500">({user?.employeeNumber})</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-2 h-4 w-4 text-gray-400 hover:text-gray-600"
                        onClick={() => toggleUserSelection(userId)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  );
                })}
                <Button variant="link" className="text-gray-600 hover:text-gray-800 text-sm" onClick={() => setSelectedUsers([])}>
                  Clear All
                </Button>
              </div>
            )}
            <div className="grid grid-cols-2 gap-6">
              <div className="border rounded-lg overflow-hidden shadow-sm">
                <div className="bg-gray-50 px-4 py-2 border-b">
                  <h3 className="font-semibold text-gray-700 text-sm">Departments</h3>
                </div>
                <ScrollArea className="h-[400px]">
                  <div className="p-3">
                    {departments.filter(dept => dept.parentId === null).map(dept => renderDepartment(dept))}
                  </div>
                </ScrollArea>
              </div>
              <div className="border rounded-lg overflow-hidden shadow-sm">
                <div className="bg-gray-50 px-4 py-2 border-b flex justify-between items-center">
                  <h3 className="font-semibold text-gray-700 text-sm">Users</h3>
                  {filteredUsers.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={selectAllUsers}
                      className="text-xs"
                    >
                      Select All
                    </Button>
                  )}
                </div>
                <ScrollArea className="h-[400px]">
                  <div className="p-2">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <div
                          key={user.id}
                          className={`p-3 flex items-center cursor-pointer transition-colors duration-200 rounded-lg mb-2 ${selectedUsers.includes(user.id)
                            ? 'bg-gray-100 hover:bg-gray-200'
                            : 'hover:bg-gray-100'
                            }`}
                          onClick={() => toggleUserSelection(user.id)}
                        >
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${selectedUsers.includes(user.id) ? 'bg-gray-500 text-white' : 'bg-gray-200 text-gray-600'
                            }`}>
                            <User className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-800 text-sm">{user.name}</div>
                            <div className="text-xs text-gray-500">{user.jobTitle} | {user.employeeNumber}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">No users found</div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button variant={'default'} onClick={() => {
              console.log('Selected users:', selectedUsers.map(id => mockUsers.find(u => u.id === id)));
              setIsOpen(false);
            }}>Apply ({selectedUsers.length})</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserSelectionDialog;