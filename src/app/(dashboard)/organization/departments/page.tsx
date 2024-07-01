"use client"
import React, { useEffect, useState } from 'react';
import { Plus, Pencil } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CreateDepartmentForm from './components/CreateDepartmentForm';
import { departmentService } from '@/services';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function DepartmentListPage() {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [departments, setDepartments] = useState([]);

    const handleEdit = (id: string) => {
        console.log('Edit department with id:', id);
    };

    useEffect(() => {
        listDepartments()
    }, [isCreateDialogOpen])

    function listDepartments() {
        departmentService.list().then(response => {
            setDepartments(response.data)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div className='space-y-2'>
                        <CardTitle>Departments</CardTitle>
                        <CardDescription>Manage your organization's departments</CardDescription>
                    </div>
                    <CreateDepartmentForm open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} departments={departments} />
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Parent Department</TableHead>
                            <TableHead>Employees</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {departments.filter((d: any) => !d.is_company).map((department: any) => (
                            <TableRow key={department.id}>
                                <TableCell>{department.name}</TableCell>
                                <TableCell>
                                    {department.parent_department?.name || 'N/A'}
                                    {department.parent_department?.parentDepartment == null ? <>⭐</> : <></>}
                                </TableCell>
                                <TableCell>
                                    <div className='flex space-x-2'>
                                        {department.users.map((user: any, index: number) => (
                                            <div key={index} title={user.username}>
                                                <div id="tooltip-jese" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                                    Jese Leos
                                                    <div className="tooltip-arrow" data-popper-arrow></div>
                                                </div>
                                                <img data-tooltip-target="tooltip-jese" className="w-10 h-10 rounded" src={`https://ui-avatars.com/api/?name=${user.username}&background=random`} alt="Medium avatar" />
                                            </div>

                                        ))}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
