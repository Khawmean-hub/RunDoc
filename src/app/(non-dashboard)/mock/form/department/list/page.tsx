"use client"
import React, { useState } from 'react';
import { Plus, Pencil } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CreateDepartmentForm from './CreateDepartmentForm';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// Mock data for departments
const mockDepartments = [
  { id: '1', name: 'Human Resources', parentDepartment: null },
  { id: '2', name: 'Finance', parentDepartment: null },
  { id: '3', name: 'Information Technology', parentDepartment: null },
  { id: '4', name: 'Payroll', parentDepartment: 'Finance' },
  { id: '5', name: 'Software Development', parentDepartment: 'Information Technology' },
];

export default function DepartmentListPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [departments, setDepartments] = useState(mockDepartments);

  const handleEdit = (id: string) => {
    // Implement edit functionality
    console.log('Edit department with id:', id);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Departments</CardTitle>
            <CardDescription>Manage your organization&apos;s departments</CardDescription>
          </div>
          <CreateDepartmentForm open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Parent Department</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.map((department) => (
              <TableRow key={department.id}>
                <TableCell>{department.name}</TableCell>
                <TableCell>{department.parentDepartment || 'N/A'}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(department.id)}>
                    <Pencil size={16} className="mr-2" /> Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
