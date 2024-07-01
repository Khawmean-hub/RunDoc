"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from 'lucide-react';
import { departmentService } from '@/services';
import toast from 'react-hot-toast';
// Mock data for parent departments
const parentDepartments = [
    { id: '1', name: 'HR' },
    { id: '2', name: 'Finance' },
    { id: '3', name: 'IT' },
];

interface FormData {
    name: string;
    parent_department: string;
}

export default function CreateDepartmentForm({
    open,
    onOpenChange,
    departments
}: any) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [parentDepartment, setParentDepartment] = useState('');

    const onSubmit = (data: FormData) => {
        console.log(data);
        departmentService.create({
            name: data.name,
            parent_department: parentDepartment
        }).then(response => {
            toast.success('Department created successfully!');
            onOpenChange(false)
        }).catch(err => {
            toast.error('Error creating department!');
        })
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                 <Button variant="default" size="icon" className='rounded-full h-12 w-12'>
                    <Plus size={16} /> 
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Department</DialogTitle>
                    <DialogDescription>Add a new department to your organization.</DialogDescription>
                </DialogHeader>
                {/* <CreateDepartmentForm /> */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                placeholder="Enter department name"
                                {...register("name", { required: "Department name is required" })}
                            />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="parentDepartment">Parent Department</Label>
                            <Select onValueChange={(value) => setParentDepartment(value)} defaultValue={departments.find((d: any) => d.is_company)?.id}>
                                <SelectTrigger id="parentDepartment">
                                    <SelectValue placeholder="Select parent department" />
                                </SelectTrigger>
                                <SelectContent>
                                    {departments.map((dept: any) => (
                                        <SelectItem key={dept.id} value={dept.id}>{dept.name}{dept.is_company ? <>⭐</> : <></>}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <CardFooter className="flex justify-end mt-4 space-x-2">
                        <Button variant="outline">Cancel</Button>
                        <Button type="submit">Create</Button>
                    </CardFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
