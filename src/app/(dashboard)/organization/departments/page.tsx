"use client"
import React, { useEffect, useState } from 'react';
import { Plus, Users, MoreVertical, UserCircle, Briefcase, Edit, CircleX } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import CreateDepartmentForm from './components/CreateDepartmentForm';
import UpdateDepartmentForm from './components/UpdateDepartmentForm';
import { departmentService, userService } from '@/services';

export default function DepartmentListPage() {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    const [departments, setDepartments] = useState<any>(null);
    const [users, setUsers] = useState<any[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState<any>(null);

    useEffect(() => {
        listDepartments()
        listUsers()
    }, [isCreateDialogOpen, isUpdateDialogOpen])

    function listUsers() {
        userService.listUser().then(response => {
            setUsers(response.data)
        }).catch(err => {
            console.log(err)
        })
    }

    function listDepartments() {
        departmentService.list().then(response => {
            setDepartments(response.data)
        }).catch(err => {
            console.log(err)
        })
    }

    function deleteDepartment(departmentId: string) {
        departmentService.delete(departmentId).then(() => {
            listDepartments();
        }).catch(err => {
            console.log(err)
        })
    }

    function handleUpdateDepartment(department: any) {
        setSelectedDepartment(department);
        setIsUpdateDialogOpen(true);
    }

    return (
        departments && (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Departments</h1>
                        <p className="text-gray-600 mt-2">Manage your organization&apos;s departments</p>
                    </div>
                    <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="mr-2 h-4 w-4" /> Add Department
                    </Button>
                </div>

                {departments.filter((d: any) => !d.isOrganization).length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {departments.filter((d: any) => !d.isOrganization).map((department: any) => (
                            <Card key={department.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-blue-500">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
                                            <Briefcase className="h-5 w-5 mr-2 text-blue-500" />
                                            {department.name}
                                        </CardTitle>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onSelect={() => handleUpdateDepartment(department)}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                            <CircleX className="mr-2 h-4 w-4"/>
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you sure you want to delete this department?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will permanently delete the
                                                                department and remove all associated data.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => deleteDepartment(department.id)}>
                                                                Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <CardDescription className="text-sm text-gray-500 mt-1">
                                        {department.hierarchyString}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="mt-4 space-y-3">
                                        <div className="flex items-center p-2 bg-gray-50 rounded-md">
                                            <UserCircle className="h-5 w-5 text-blue-500 mr-2" />
                                            <span className="text-sm font-medium text-gray-700">Manager: {department.manager?.username || <span className='text-muted-foreground'>No manager assigned</span>}</span>
                                        </div>
                                        <div className="flex items-center p-2 bg-gray-50 rounded-md">
                                            <Users className="h-5 w-5 text-blue-500 mr-2" />
                                            <span className="text-sm font-medium text-gray-700">Total Members: {department.total_employee}</span>
                                        </div>
                                    </div>
                                    <div className="flex -space-x-2 overflow-hidden mt-6">
                                        {department.users?.slice(0, 5).map((user: any, index: number) => (
                                            <img
                                                key={index}
                                                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                                                src={`https://ui-avatars.com/api/?name=${user.username}&background=random`}
                                                alt={user.username}
                                                title={user.username}
                                            />
                                        ))}
                                        {department.users?.length > 5 && (
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-xs font-medium text-gray-500 ring-2 ring-white">
                                                +{department.users?.length - 5}
                                            </span>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-lg">
                        <Users className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-semibold text-gray-900">No departments</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new department.</p>
                        <div className="mt-6">
                            <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                                <Plus className="mr-2 h-4 w-4" /> New Department
                            </Button>
                        </div>
                    </div>
                )}

                <CreateDepartmentForm open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} departments={departments} users={users} />
                <UpdateDepartmentForm 
                    open={isUpdateDialogOpen} 
                    onOpenChange={setIsUpdateDialogOpen} 
                    department={selectedDepartment} 
                    departments={departments} 
                    users={users} 
                    onUpdate={listDepartments}
                />
            </div>
        )
    );
}