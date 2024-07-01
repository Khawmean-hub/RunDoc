"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { departmentService } from '@/services';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CreateDepartmentForm from './departments/components/CreateDepartmentForm';

interface Employee {
    id: string;
    name: string;
    position: string;
    imageUrl: string;
    childDepartments?: Employee[];
}

const EmployeeCard: React.FC<{ employee: Employee }> = ({ employee }) => (
    <Card className="w-36">
        <CardHeader className="p-2">
            <img src={`https://ui-avatars.com/api/?name=${employee.name}&background=random`} alt={employee.name} className="w-12 h-12 rounded-full mx-auto mb-1" />
            <h3 className="text-xs font-semibold text-center">{employee.name}</h3>
        </CardHeader>
        <CardContent className="p-2 pt-0">
            <p className="text-xxs text-gray-500 text-center">{employee.position}</p>
        </CardContent>
    </Card>
);

const EmployeeNode: React.FC<{ employee: Employee }> = ({ employee }) => (
    <div className="flex flex-col items-center">
        <EmployeeCard employee={employee} />
        {employee.childDepartments && employee.childDepartments.length > 0 && (
            <div className="flex flex-col items-center">
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="flex flex-row relative">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gray-300"></div>
                    {employee.childDepartments.map((child, index) => (
                        <div key={child.id} className="flex flex-col items-center px-2">
                            <div className="w-px h-4 bg-gray-300"></div>
                            <EmployeeNode employee={child} />
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
);

const OrganizationHierarchy: React.FC<{ data: Employee }> = ({ data }) => {
    return (
        <div className="flex flex-col items-center p-4">
            <h2 className="text-xl font-bold mb-4">Organization Hierarchy</h2>
            <EmployeeNode employee={data} />
        </div>
    );
};

export default function App() {
    const router = useRouter()
    const [organizationData, setOrganizationData] = useState({
        id: "1",
        name: "Henry Bennett",
        position: "Chairman & CEO",
        imageUrl: "/api/placeholder/50/50",
        children: [
            {
                id: "2",
                name: "Mildred Kim",
                position: "Manager",
                imageUrl: "/api/placeholder/50/50",
                children: [
                    {
                        id: "3",
                        name: "Charles Little",
                        position: "Marketer",
                        imageUrl: "/api/placeholder/50/50",
                        children: [
                            {
                                id: "4",
                                name: "Sandra Butler",
                                position: "Content Marketer",
                                imageUrl: "/api/placeholder/50/50",
                                children: [
                                    {
                                        id: "5",
                                        name: "Eugene Foster",
                                        position: "Content Marketer",
                                        imageUrl: "/api/placeholder/50/50",
                                    }
                                ]
                            },
                            {
                                id: "6",
                                name: "Mark Nichols",
                                position: "Social Media",
                                imageUrl: "/api/placeholder/50/50",
                                children: [
                                    {
                                        id: "7",
                                        name: "Nicholas Cruz",
                                        position: "Social Media",
                                        imageUrl: "/api/placeholder/50/50",
                                    }
                                ]
                            },
                            {
                                id: "8",
                                name: "Mary Bradley",
                                position: "Research",
                                imageUrl: "/api/placeholder/50/50",
                            }
                        ]
                    }
                ]
            },
            {
                id: "9",
                name: "Jerry Wagner",
                position: "Technical Director",
                imageUrl: "/api/placeholder/50/50",
                children: [
                    {
                        id: "10",
                        name: "Jonathan Lane",
                        position: "Team Lead",
                        imageUrl: "/api/placeholder/50/50",
                        children: [
                            {
                                id: "11",
                                name: "Louis Arnold",
                                position: "QA",
                                imageUrl: "/api/placeholder/50/50",
                            },
                            {
                                id: "12",
                                name: "Mark West",
                                position: "Front End",
                                imageUrl: "/api/placeholder/50/50",
                            },
                            {
                                id: "13",
                                name: "Billy Schultz",
                                position: "Back End",
                                imageUrl: "/api/placeholder/50/50",
                            }
                        ]
                    }
                ]
            }
        ]
    })

    const [isCreateDialogOpen,setIsCreateDialogOpen] = useState()
    const [departments,setDepartments] = useState([])
    function getHierarchy() {
        departmentService.getHierarchy().then(response => {
            setOrganizationData(response.data[0])
        }).catch(er => {
            console.log(er)
        })
    }
    function listDepartments() {
        departmentService.list().then(response => {
            setDepartments(response.data)
        }).catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        getHierarchy()
        listDepartments()
    }, [])

    return <>
        <OrganizationHierarchy data={organizationData} />;
        <div className='fixed bottom-16 right-16'>
        <CreateDepartmentForm open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} departments={departments} />
        </div>
    </>
}