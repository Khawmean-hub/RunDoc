// app/departments/create/page.tsx
"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { departmentService } from '@/services'

export default function CreateDepartment() {
    const [name, setName] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        departmentService.create({
            name
        }).then(response => {
            console.log(response)
            router.push('/organization/departments')
        }).catch(er => {
            console.log(er)
        })

    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Create Department</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
            </form>
        </div>
    )
}
