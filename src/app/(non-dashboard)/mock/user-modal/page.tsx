'use client';

import { useState } from 'react';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, Dialog, DialogTitle } from '@/components/ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CheckIcon, PlusIcon } from 'lucide-react';

const usersData = [
  { name: 'Alice Johnson', email: 'alice@example.com', username: 'alice' },
  { name: 'Bob Smith', email: 'bob@example.com', username: 'bob' },
  { name: 'Carol Danvers', email: 'carol@example.com', username: 'carol' },
];

const departmentsData = [
  { name: 'HR', email: 'hr@example.com', username: 'hr' },
  { name: 'Engineering', email: 'engineering@example.com', username: 'engineering' },
  { name: 'Marketing', email: 'marketing@example.com', username: 'marketing' },
];

export default function Home() {
  const [isMainModalOpen, setIsMainModalOpen] = useState(false);
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const [selectionType, setSelectionType] = useState<'user' | 'department' | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const openMainModal = () => setIsMainModalOpen(true);
  const closeMainModal = () => setIsMainModalOpen(false);
  const openSelectionModal = (type: 'user' | 'department') => {
    setSelectionType(type);
    setIsSelectionModalOpen(true);
  };
  const closeSelectionModal = () => setIsSelectionModalOpen(false);

  const handleSelection = (item: any) => {
    if (selectionType === 'user') {
      setSelectedUsers([...selectedUsers, item]);
    } else if (selectionType === 'department') {
      setSelectedDepartments([...selectedDepartments, item]);
    }
  };

  const handleConfirmSelection = () => {
    if (selectionType === 'user') {
      setSelectedItems(selectedUsers);
    } else if (selectionType === 'department') {
      setSelectedItems(selectedDepartments);
    }
    closeSelectionModal();
    openMainModal();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <button
        onClick={openMainModal}
        className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700"
      >
        Open User and Department List
      </button>

      {/* Main Modal */}
      <Dialog open={isMainModalOpen} onOpenChange={setIsMainModalOpen}>
        <DialogContent className="gap-0 p-0 outline-none">
          <DialogHeader className="px-4 pb-4 pt-5">
            <DialogTitle>Selected Users and Departments</DialogTitle>
            <DialogDescription>View and manage your selections below.</DialogDescription>
          </DialogHeader>
          <div className="px-4 py-5">
            <div id="selectedList" className="mb-4">
              {selectedUsers.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-bold">Users:</h4>
                  {selectedUsers.map((user, index) => (
                    <div key={index} className="flex items-center">
                      <Avatar className="mr-2">
                        <AvatarImage src={`https://ui-avatars.com/api/?name=${user.username}`} alt={user.name} />
                        <AvatarFallback>{user.username[0]}</AvatarFallback>
                      </Avatar>
                      <p className="text-gray-700">{user.name}</p>
                    </div>
                  ))}
                </div>
              )}
              {selectedDepartments.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-bold">Departments:</h4>
                  {selectedDepartments.map((department, index) => (
                    <div key={index} className="flex items-center">
                      <Avatar className="mr-2">
                        <AvatarImage src={`https://ui-avatars.com/api/?name=${department.username}`} alt={department.name} />
                        <AvatarFallback>{department.username[0]}</AvatarFallback>
                      </Avatar>
                      <p className="text-gray-700">{department.name}</p>
                    </div>
                  ))}
                </div>
              )}
              {selectedUsers.length === 0 && selectedDepartments.length === 0 && (
                <p className="text-gray-700">No users or departments selected.</p>
              )}
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => openSelectionModal('user')}
                className="mr-2 py-2 px-4 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 flex items-center"
              >
                <PlusIcon className="h-5 w-5 mr-1" />
                Add User
              </button>
              <button
                onClick={() => openSelectionModal('department')}
                className="py-2 px-4 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 flex items-center"
              >
                <PlusIcon className="h-5 w-5 mr-1" />
                Add Department
              </button>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeMainModal}
                className="py-2 px-4 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Selection Modal */}
      <Dialog open={isSelectionModalOpen} onOpenChange={setIsSelectionModalOpen}>
        <DialogContent className="gap-0 p-0 outline-none">
          <DialogHeader className="px-4 pb-4 pt-5">
            <DialogTitle>Select {selectionType === 'user' ? 'Users' : 'Departments'}</DialogTitle>
            <DialogDescription>Choose from the list below.</DialogDescription>
          </DialogHeader>
          <Command className="overflow-hidden rounded-t-none border-t">
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No {selectionType} found.</CommandEmpty>
              <CommandGroup className="p-2">
                {(selectionType === 'user' ? usersData : departmentsData).map((item: any) => (
                  <CommandItem
                    key={item.email}
                    className="flex items-center px-2"
                    onSelect={() => handleSelection(item)}
                  >
                    <Avatar className="mr-2">
                      <AvatarImage src={`https://ui-avatars.com/api/?name=${item.username}`} alt={item.name} />
                      <AvatarFallback>{item.username[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-2">
                      <p className="text-sm font-medium leading-none">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.email}</p>
                    </div>
                    {(selectionType === 'user' ? selectedUsers : selectedDepartments).includes(item) && (
                      <CheckIcon className="ml-auto flex h-5 w-5 text-primary" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
            {selectedItems.length > 0 ? (
              <div className="flex -space-x-2 overflow-hidden">
                {selectedItems.map((item: any) => (
                  <Avatar
                    key={item.email}
                    className="inline-block border-2 border-background"
                  >
                    <AvatarImage src={`https://ui-avatars.com/api/?name=${item.username}`} />
                    <AvatarFallback>{item.username[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Select {selectionType} to add.</p>
            )}
            <Button
              disabled={selectedItems.length < 1}
              onClick={handleConfirmSelection}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
