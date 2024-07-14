"use client"
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { User, Mail, Lock, Briefcase, Phone, Building, UserPlus, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { adminService, departmentService, positionService } from '@/services';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MANAGER = 'MANAGER'
}

interface UserFormData {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  positionId: string;
  phoneNumber: string;
  departmentId: string;
}

interface Position {
  id: string;
  title: string;
}

interface Department {
  id: string;
  name: string;
}

const userRoles = Object.values(UserRole);

const toSnakeCase = (str: string) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

const transformToSnakeCase = (obj: Record<string, any>): Record<string, any> => {
  return Object.keys(obj).reduce((acc, key) => {
    acc[toSnakeCase(key)] = obj[key];
    return acc;
  }, {} as Record<string, any>);
};

export default function AddUser() {
  const { register, control, handleSubmit, formState: { errors } } = useForm<UserFormData>();
  const router = useRouter();

  const [positions, setPositions] = useState<Position[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    listDepartments();
    listPositions();
  }, []);

  function listDepartments() {
    departmentService.list().then(response => {
      setDepartments(response.data.map((dept: any) => ({ id: dept.id, name: dept.name })));
    });
  }

  function listPositions() {
    positionService.list().then(response => {
      setPositions(response.data.map((pos: any) => ({ id: pos.id, title: pos.title })));
    });
  }

  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    setIsSubmitting(true);
    const snakeCaseData = transformToSnakeCase(data);
    console.log('User data submitted:', snakeCaseData);
    adminService.addUser(snakeCaseData)
      .then(response => {
        console.log(response);
        toast.success('User created successfully!');
        router.push('/organization/users');
      })
      .catch(err => {
        console.log(err);
        toast.error('Error creating user. Please try again.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const formFields = [
    { name: 'username', label: 'Username', icon: User, type: 'text' },
    { name: 'email', label: 'Email', icon: Mail, type: 'email' },
    { name: 'password', label: 'Password', icon: Lock, type: 'password' },
    { name: 'role', label: 'Role', icon: Briefcase, type: 'select', options: userRoles },
    { name: 'positionId', label: 'Position', icon: Briefcase, type: 'select', options: positions },
    { name: 'phoneNumber', label: 'Phone Number', icon: Phone, type: 'tel' },
    { name: 'departmentId', label: 'Department', icon: Building, type: 'select', options: departments },
  ];

  return (
    <>
      <ToastContainer />
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-semibold">Add New User</CardTitle>
            <Link href="/organization/users">
              <Button variant="outline" size="sm" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
          </div>
          <CardDescription>Create a new user account by filling out the form below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formFields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name} className="text-sm font-medium flex items-center text-gray-700">
                    <field.icon className="mr-2 text-gray-500" size={18} />
                    {field.label}
                  </Label>
                  {field.type === 'select' ? (
                    <Controller
                      name={field.name as keyof UserFormData}
                      control={control}
                      rules={{ required: `${field.label} is required` }}
                      render={({ field: { onChange, value } }) => (
                        <Select onValueChange={onChange} value={value}>
                          <SelectTrigger className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <SelectValue placeholder={`Select ${field.label}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option: any) => (
                              <SelectItem key={option.id || option} value={option.id || option}>
                                {typeof option === 'object' ? (option.title || option.name) : option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  ) : (
                    <Input
                      id={field.name}
                      {...register(field.name as keyof UserFormData, { required: `${field.label} is required` })}
                      type={field.type}
                      placeholder={field.label}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  )}
                  {errors[field.name as keyof UserFormData] && (
                    <p className="text-red-500 text-xs mt-1">{errors[field.name as keyof UserFormData]?.message}</p>
                  )}
                </div>
              ))}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            type="submit" 
            onClick={handleSubmit(onSubmit)} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding User...
              </>
            ) : (
              <>
                <UserPlus className="mr-2" size={18} />
                Add User
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}