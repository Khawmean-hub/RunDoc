// app/departments/page.tsx
"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { departmentService } from '@/services'

type Department = {
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
}

export default function DepartmentList() {
    const [departments, setDepartments] = useState<Department[]>([])

    useEffect(() => {
        listDepartments()
    }, [])

    function listDepartments() {
        departmentService.list().then(response => {
            setDepartments(response.data)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Departments</h1>
            <Link href="/organization/departments/create">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Create Department</button>
            </Link>
            <ul className="mt-4">
                {departments.map(department => (
                    <li key={department.id} className="border p-4 my-2 rounded shadow">
                        <Link href={`/departments/${department.id}`} className='text-lg font-semibold'>
                            
                            {department.name}
                        </Link>
                        <p>Created at: {new Date(department.createdAt).toLocaleString()}</p>
                        <p>Updated at: {new Date(department.updatedAt).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
