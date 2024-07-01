// app/organization/positions/[id]/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { positionService } from '@/services/position.service'
import Link from 'next/link'

type Position = {
    id: string,
    title: string,
    description: string,
    createdAt: string,
    updatedAt: string
}

export default function ViewPosition() {
    const { id } = useParams()
    const [position, setPosition] = useState<Position | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (id) {
            positionService.get(id as string).then(response => {
                setPosition(response.data)
                setLoading(false)
            })
        }
    }, [id])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Position Details</h1>
            {position && (
                <div>
                    <p className="text-xl font-semibold">{position.title}</p>
                    <p>{position.description}</p>
                    <p>Created at: {new Date(position.createdAt).toLocaleString()}</p>
                    <p>Updated at: {new Date(position.updatedAt).toLocaleString()}</p>
                    <Link href="/organization/positions">
                        <button className="bg-gray-500 text-white px-4 py-2 rounded mt-4">Back to List</button>
                    </Link>
                </div>
            )}
        </div>
    )
}
