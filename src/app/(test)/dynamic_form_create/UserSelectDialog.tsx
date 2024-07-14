import React, { useState, useMemo } from 'react';
import { CheckIcon, Users, Search, ChevronRight, ChevronDown } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface User {
  id: string;
  name: string;
}

interface Department {
  id: number;
  name: string;
  children?: Department[];
  users?: User[];
}

// Updated hierarchical department structure
const departments: Department[] = [
  {
    id: 1,
    name: 'Executive',
    children: [
      { id: 11, name: 'CEO Office', users: [{ id: '1', name: 'John Doe' }, { id: '2', name: 'Jane Smith' }] },
      { id: 12, name: 'Board', users: [{ id: '3', name: 'Alice Johnson' }, { id: '4', name: 'Bob Williams' }] },
    ],
  },
  {
    id: 2,
    name: 'Operations',
    children: [
      {
        id: 21,
        name: 'Human Resources',
        children: [
          { id: 211, name: 'Recruiting', users: [{ id: '5', name: 'Charlie Brown' }, { id: '6', name: 'Diana Prince' }] },
          { id: 212, name: 'Employee Relations', users: [{ id: '7', name: 'Eva Green' }, { id: '8', name: 'Frank Castle' }] },
        ],
      },
      {
        id: 22,
        name: 'Finance',
        users: [{ id: '9', name: 'Grace Hopper' }, { id: '10', name: 'Hank Pym' }],
      },
    ],
  },
  {
    id: 3,
    name: 'Product',
    children: [
      { id: 31, name: 'Engineering', users: [{ id: '11', name: 'Ivy Reed' }, { id: '12', name: 'Jack Sparrow' }, { id: '13', name: 'Kate Austen' }] },
      { id: 32, name: 'Design', users: [{ id: '14', name: 'Lara Croft' }, { id: '15', name: 'Max Payne' }] },
      { id: 33, name: 'Marketing', users: [{ id: '16', name: 'Nora Allen' }, { id: '17', name: 'Oscar Isaac' }] },
    ],
  },
];

interface DepartmentItemProps {
  department: Department;
  level: number;
  selectedDepartment: Department | null;
  onSelect: (dept: Department) => void;
}

const DepartmentItem: React.FC<DepartmentItemProps> = ({ department, level, selectedDepartment, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = department.children && department.children.length > 0;

  return (
    <div>
      <button
        className={cn(
          'w-full text-left px-4 py-2 flex items-center space-x-2 transition-colors',
          selectedDepartment?.id === department.id ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100',
          level > 0 && 'pl-8'
        )}
        onClick={() => {
          onSelect(department);
          if (hasChildren) setIsOpen(!isOpen);
        }}
      >
        {hasChildren && (
          <span className="text-gray-400">
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
        <span className="flex-grow">{department.name}</span>
      </button>
      {isOpen && hasChildren && (
        <div className="ml-4">
          {department.children?.map((child) => (
            <DepartmentItem
              key={child.id}
              department={child}
              level={level + 1}
              selectedDepartment={selectedDepartment}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const UserSelectionModal: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [departmentSearch, setDepartmentSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');

  const flattenDepartments = (deps: Department[], search: string): Department[] => {
    return deps.flatMap(dep => {
      if (dep.name.toLowerCase().includes(search.toLowerCase())) {
        return [dep, ...(dep.children ? flattenDepartments(dep.children, '') : [])];
      } else if (dep.children) {
        return flattenDepartments(dep.children, search);
      }
      return [];
    });
  };

  const filteredDepartments = useMemo(() => {
    return flattenDepartments(departments, departmentSearch);
  }, [departmentSearch]);

  const filteredUsers = useMemo(() => {
    if (!selectedDepartment || !selectedDepartment.users) return [];
    return selectedDepartment.users.filter(user =>
      user.name.toLowerCase().includes(userSearch.toLowerCase())
    );
  }, [selectedDepartment, userSearch]);

  const handleDepartmentSelect = (dept: Department) => {
    setSelectedDepartment(dept);
    setUserSearch('');
  };

  const handleUserToggle = (user: User) => {
    setSelectedUsers(prev =>
      prev.some(u => u.id === user.id) ? prev.filter(u => u.id !== user.id) : [...prev, user]
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Users size={16} />
          Select Users
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Select Users</DialogTitle>
        </DialogHeader>
        <div className="flex h-[500px]">
          {/* Departments column */}
          <div className="w-1/3 border-r flex flex-col bg-gray-50">
            <div className="p-4">
              <Input
                placeholder="Search departments"
                value={departmentSearch}
                onChange={(e) => setDepartmentSearch(e.target.value)}
                className="mb-2"
              />
            </div>
            <div className="overflow-y-auto flex-grow">
              {filteredDepartments.map((dept) => (
                <DepartmentItem
                  key={dept.id}
                  department={dept}
                  level={0}
                  selectedDepartment={selectedDepartment}
                  onSelect={handleDepartmentSelect}
                />
              ))}
            </div>
          </div>
          {/* Users column */}
          <div className="w-2/3 flex flex-col bg-white">
            <div className="p-4 border-b">
              <Input
                placeholder="Search users"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="mb-2"
              />
            </div>
            <div className="overflow-y-auto flex-grow p-4">
              <h3 className="font-semibold mb-4 text-gray-700">
                {selectedDepartment ? `Users in ${selectedDepartment.name}` : 'Select a department'}
              </h3>
              <div className="space-y-2">
                {filteredUsers.map((user) => (
                  <button
                    key={user.id}
                    className={cn(
                      'w-full flex items-center space-x-3 p-2 rounded-lg transition-colors',
                      selectedUsers.some(u => u.id === user.id)
                        ? 'bg-blue-100 text-blue-800'
                        : 'hover:bg-gray-100'
                    )}
                    onClick={() => handleUserToggle(user)}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`/api/placeholder/200/200?text=${user.name[0]}`} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="flex-grow text-left">{user.name}</span>
                    {selectedUsers.some(u => u.id === user.id) && (
                      <CheckIcon size={20} className="text-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center p-4 bg-gray-50 border-t">
          <span className="text-sm text-gray-500">
            Selected: {selectedUsers.length} user(s)
          </span>
          <Button className="flex items-center gap-2">
            <CheckIcon size={16} />
            Confirm Selection
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserSelectionModal;