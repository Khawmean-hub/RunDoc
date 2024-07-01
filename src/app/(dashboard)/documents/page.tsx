"use client"
import React, { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon, UsersIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { documentService } from '@/services';
import { Input } from '@/components/ui/input';
import { Button, buttonVariants } from '@/components/ui/button';
import moment from 'moment';
import DocumentBadgeComponent from './components/DocumentBadgeComponent';

interface User {
    username: string;
}

interface Document {
    id: string;
    name: string;
    level: string;
    inputNo: string;
    modifyDate: string;
    color?: string;
    is_owner: boolean;
    is_involved: boolean;
    owner: User;
    level_completed: string;
}

const DocumentPage: React.FC = () => {
    const router = useRouter();
    const [documents, setDocuments] = useState<Document[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        listDocuments();
    }, []);

    const listDocuments = () => {
        documentService.listMyDocuments()
            .then(response => {
                setDocuments(response.data);
            })
            .catch(() => {
                alert('Something went wrong');
            });
    };

    const handlePageChange = (direction: 'prev' | 'next') => {
        setPage(prevPage => direction === 'prev' ? Math.max(prevPage - 1, 1) : prevPage + 1);
    };

    const isDocumentCompleted = (level_completed: string) => {
        const [completed, total] = level_completed.split('/').map(Number);
        return completed === total;
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Documents</h1>
                <div className="flex items-center space-x-2">
                    <Input type="date" className="border rounded p-2" />
                    <Input type="date" className="border rounded p-2" />
                    <Input type="text" className="border rounded p-2" placeholder="Search" />
                </div>
                <Link className={buttonVariants({ variant: "default" })} href="/documents/new">
                    New Document
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map((document:any)=>{
                    return <DocumentBadgeComponent document={document} />
                })}
                {/* {documents.map((document) => (
                    <div
                        key={document.id}
                        className={`p-4 border rounded shadow hover:shadow-lg cursor-pointer transition-shadow duration-200 ${isDocumentCompleted(document.level_completed) ? 'bg-green-100 border-green-400' : ''}`}
                        onClick={() => router.push(`/documents/${document.id}`)}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(document.owner.username)}&background=random`}
                                    alt={`${document.owner.username}'s avatar`}
                                    className="w-10 h-10 rounded-full border"
                                />
                                <div>
                                    <h3 className="font-semibold text-lg">{document.name}</h3>
                                    <p className="text-sm text-gray-600">{document.owner.username}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-1">
                                {document.is_owner && <StarIcon className="h-5 w-5 text-yellow-500" />}
                                {document.is_involved && !document.is_owner && <UsersIcon className="h-5 w-5 text-blue-500" />}
                            </div>
                        </div>
                        <p className="text-sm"><b>Modified:</b> {moment(document.modifyDate).format("YYYY-MM-DD hh:mm:ss A")}</p>
                        <p className="text-sm"><b>Level completed:</b> {document.level_completed}</p>
                    </div>
                ))} */}
            </div>
            <div className="flex justify-between items-center mt-6">
                <div className="flex items-center space-x-2">
                    <label className="mr-2">Page rows:</label>
                    <select className="border rounded p-2 w-20">
                        <option>5</option>
                        <option>10</option>
                        <option>20</option>
                    </select>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => handlePageChange('prev')}
                        disabled={page === 1}
                        className="p-2 border rounded hover:bg-gray-100 transition-colors duration-200"
                    >
                        <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
                    </button>
                    <span className="text-lg">{`Page ${page}`}</span>
                    <button
                        onClick={() => handlePageChange('next')}
                        className="p-2 border rounded hover:bg-gray-100 transition-colors duration-200"
                    >
                        <ChevronRightIcon className="h-5 w-5 text-gray-500" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DocumentPage;
