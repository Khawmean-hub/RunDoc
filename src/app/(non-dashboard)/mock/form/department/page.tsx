"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for parent departments
const parentDepartments = [
  { id: '1', name: 'HR' },
  { id: '2', name: 'Finance' },
  { id: '3', name: 'IT' },
];

interface FormData {
  name: string;
  parentDepartment: string;
}

export default function CreateDepartmentForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [parentDept, setParentDept] = useState('');

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Here you would typically send the data to your backend
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Department</CardTitle>
        <CardDescription>Add a new department to your organization.</CardDescription>
      </CardHeader>
      <CardContent>
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
              <Select onValueChange={(value) => setParentDept(value)}>
                <SelectTrigger id="parentDepartment">
                  <SelectValue placeholder="Select parent department" />
                </SelectTrigger>
                <SelectContent>
                  {parentDepartments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <CardFooter className="flex justify-between mt-4">
            <Button variant="outline">Cancel</Button>
            <Button type="submit">Create</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
