"use client"
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { departmentService } from '@/services';
import toast from 'react-hot-toast';
import { Building2, X } from 'lucide-react';

interface FormData {
    name: string;
    parent_id: string;
    manager_id:string;
}

export default function CreateDepartmentForm({
    open,
    onOpenChange,
    departments,
    users
}: any) {
    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        departmentService.create({
            name: data.name,
            parent_id: data.parent_id,
            manager_id:data.manager_id
        }).then(response => {
            toast.success('Department created successfully!');
            onOpenChange(false);
            reset();
        }).catch(err => {
            toast.error('Error creating department!');
        });
    };

    const handleClose = () => {
        onOpenChange(false);
        reset();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">Create New Department</DialogTitle>
                    {/* <button 
                        onClick={handleClose} >
                    </button> */}
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">Department Name</Label>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: "Department name is required" }}
                            render={({ field }) => (
                                <Input 
                                    {...field}
                                    id="name"
                                    placeholder="Enter department name"
                                    className="w-full"
                                />
                            )}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>
                    {departments!.length > 0 && (
                        <div className="space-y-2">
                            <Label htmlFor="parentDepartment" className="text-sm font-medium">Parent Department</Label>
                            <Controller
                                name="parent_id"
                                control={control}
                                defaultValue={departments.find((d: any) => d.is_company)?.id}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger id="parentDepartment" className="w-full">
                                            <SelectValue placeholder="Select parent department" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {departments.map((dept: any) => (
                                                <SelectItem key={dept.id} value={dept.id}>
                                                    <div className='flex py-2 space-x-2 justify-center items-center'>
                                                    <p>{dept.name}</p> {dept.isOrganization && <div title='Company'><Building2 className='h-4 w-4 text-gray-600'/></div>}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="manager" className="text-sm font-medium">Department Manager</Label>
                        <Controller
                            name="manager_id"
                            control={control}
                            rules={{ required: "Department manager is required" }}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger id="manager" className="w-full">
                                        <SelectValue placeholder="Select department manager" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {users.map((user: any) => (
                                            <SelectItem key={user.id} value={user.id}>
                                                {user.username}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.manager_id && <p className="text-red-500 text-sm mt-1">{errors.manager_id.message}</p>}
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Create Department</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}