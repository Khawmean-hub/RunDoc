"use client"
import React, { useContext, useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import AddUserToLevelModal from './AddUserToLevelModal'
import { DocumentTemplateContext } from '@/app/context/DocumentTemplateContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface User {
    username: string;
    email: string;
    role: string;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    setOpen?: (val: boolean) => void
}

// Define initial state
const initialFormState = {
    levelName: '',
    remark: '',
    users: [] as User[]
}

export default function NewLevelForm({ isOpen, onClose, setOpen }: ModalProps) {
    const [formState, setFormState] = useState(initialFormState)
    const [userModalOpen, setUserModalOpen] = useState(false)

    const { levels, setLevels } = useContext(DocumentTemplateContext)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!formState.levelName.trim()) {
            toast.error("Level name is required.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            return
        }

        if (formState.users.length < 1) {
            toast.error("At least one user must be added.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            return
        }

        const newLevel:any = {
            levelNumber: levels.length + 1, // Update level number based on existing levels
            name: formState.levelName,
            remark: formState.remark,
            users: formState.users.map(u=>{
                return {...u,name:u.username}
            })
        }

        setLevels([newLevel, ...levels])

        // toast.success("Level created successfully!", {
        //     position: "top-right",
        //     autoClose: 3000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        // })

        console.log("Form Data:", newLevel)

        // Reset form to initial state
        setFormState(initialFormState)

        setOpen && setOpen(false)
        onClose()
    }

    return <>
        <ToastContainer />
        <AlertDialog open={isOpen} onOpenChange={setOpen}>
            <AlertDialogContent className='max-w-2xl'>
                <AlertDialogHeader>
                    <AlertDialogTitle>Add Level</AlertDialogTitle>
                </AlertDialogHeader>

                <div className="p-4 bg-gray-50">
                    <div className="mb-4 flex gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="level-name">Level Name</label>
                            <Input
                                type="text"
                                id="level-name"
                                name="levelName"
                                value={formState.levelName}
                                onChange={handleChange}
                                placeholder="Enter level name"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="remark">Remark</label>
                            <Input
                                type="text"
                                id="remark"
                                name="remark"
                                value={formState.remark}
                                onChange={handleChange}
                                placeholder="Enter remark"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mb-4 gap-1">
                        <Button
                            variant={'default'}
                            type="button"
                            onClick={() => {
                                setOpen && setOpen(false)
                                setUserModalOpen(true)
                            }}
                        >
                            Add user
                        </Button>
                        <Button
                            type="button"
                            variant={'destructive'}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Remove selected user
                        </Button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                                <tr className="bg-gray-100">
                                    <th className="p-2 text-left">
                                        <input type="checkbox" className="form-checkbox" onChange={() => { }} />
                                    </th>
                                    <th className="p-2 text-left">Name</th>
                                    <th className="p-2 text-left">Username</th>
                                    <th className="p-2 text-left">Role</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {formState.users?.map((user, index) => (
                                    <tr key={index}>
                                        <td className="p-2">
                                            <input type="checkbox" className="form-checkbox" onChange={() => { }} />
                                        </td>
                                        <td className="p-2">{user.username}</td>
                                        <td className="p-2">{user.email}</td>
                                        <td className="p-2">{user.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmit}>Create Level</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

        <AddUserToLevelModal users={formState.users} onSubmit={(selectedUsers: User[]) => {
            setFormState(prevState => ({
                ...prevState,
                users: selectedUsers
            }))
        }} isOpen={userModalOpen} onClose={() => {
            setUserModalOpen(false)
            setOpen && setOpen(true)
        }}
            setOpen={(v: boolean) => {
                setUserModalOpen(v)
                if (!v) {
                    setOpen && setOpen(true)
                }
            }}
        />
    </>
}
