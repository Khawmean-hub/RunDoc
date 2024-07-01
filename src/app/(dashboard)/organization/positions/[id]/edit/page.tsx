// app/organization/positions/[id]/edit/page.tsx
'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { positionService } from '@/services/position.service'

export default function EditPosition() {
    const router = useRouter()
    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (id) {
            positionService.get(id as string).then(response => {
                setTitle(response.data.title)
                setDescription(response.data.description)
                setLoading(false)
            })
        }
    }, [id])

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        await positionService.update(id as string, { title, description })
        router.push('/organization/positions')
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Edit Position</h1>
            <form onSubmit={handleUpdate}>
                <div className="mb-4">
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
            </form>
        </div>
    )
}
