"use client"
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthProvider';
import { adminService } from '@/services';
import Link from 'next/link';
import { Trash2, Search, UserPlus, Filter } from 'lucide-react';
import { toast } from 'react-toastify';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [filterRole, setFilterRole] = useState<string | null>(null);

  const { role } = useAuth();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    adminService.getUsers().then(response => {
      setUsers(response.data);
    });
  };

  const deleteUser = (id: string) => {
    adminService.deleteUser(id).then(() => {
      toast.success("User deleted successfully!");
      getUsers();
      setDeleteDialogOpen(false);
    }).catch((error) => {
      toast.error("Failed to delete user. Please try again.");
      console.error(error);
    });
  };

  const filteredUsers = users.filter(user =>
    (user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterRole ? user.role.toLowerCase() === filterRole.toLowerCase() : true)
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleCheckboxChange = (id: string) => {
    const updatedSelectedUsers = new Set(selectedUsers);
    if (updatedSelectedUsers.has(id)) {
      updatedSelectedUsers.delete(id);
    } else {
      updatedSelectedUsers.add(id);
    }
    setSelectedUsers(updatedSelectedUsers);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="bg-gradient-to-r from-purple-500 to-indigo-600">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <CardTitle className="text-3xl font-bold text-white">Users Management</CardTitle>
          <Button asChild variant="secondary">
            <Link href="/organization/users/new" className="flex items-center space-x-2">
              <UserPlus className="h-4 w-4" />
              <span>New User</span>
            </Link>
          </Button>
        </CardHeader>
      </Card>

      <div className="flex space-x-4">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filter Role</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterRole(null)}>All Roles</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterRole("admin")}>Admin</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterRole("user")}>User</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedUsers.size === currentUsers.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedUsers(new Set(currentUsers.map(user => user.id)));
                      } else {
                        setSelectedUsers(new Set());
                      }
                    }}
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.has(user.id)}
                      onCheckedChange={() => handleCheckboxChange(user.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{`${user.firstName || ''} ${user.lastName || ''}`}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setUserToDelete(user.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm Deletion</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete this user? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button variant="destructive" onClick={() => deleteUser(userToDelete!)}>
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage(currentPage - 1)}
              aria-disabled={currentPage === 1}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => setCurrentPage(i + 1)}
                isActive={currentPage === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage(currentPage + 1)}
              aria-disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default UsersPage;