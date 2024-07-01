"use client"
import Drawer from "rc-drawer"
import NewLevelForm from "../components/NewLevelForm"
import { useContext, useState } from "react"
import { DocumentTemplateContext } from "@/app/context/DocumentTemplateContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import UserSelectModal from "./components/UserSelectModal";
import DepartmentSelectModal from "./components/DepartmentSelectModal";
import { BuildingOfficeIcon, TrashIcon } from "@heroicons/react/24/solid";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
import { AlertDialogAction, AlertDialogCancel, AlertDialogFooter } from "@/components/ui/alert-dialog"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { departmentService } from "@/services"
export default function Level() {

    const { levels, setLevels, templateTitle } = useContext(DocumentTemplateContext)
    return (
        <>
            <ToastContainer />
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">Level</h1>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        {/* <button
                            onClick={() => {
                                setLevelFormOpen(true)
                            }}
                            type="button"
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                        >
                            Add level
                        </button> */}
                        <AddUserToLevelModal />
                    </div>
                </div>
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                                >
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                        value="all"
                                    />
                                </th>
                                <th
                                    scope="col"
                                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                                >
                                    Level No
                                </th>
                                <th
                                    scope="col"
                                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                                >
                                    Level Name
                                </th>
                                <th
                                    scope="col"
                                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                                >
                                    Remark
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                    Users
                                </th>
                                <th
                                    scope="col"
                                    className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                >
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {levels.map((level) => (
                                <tr key={level.levelNumber} className="hover:bg-gray-50">
                                    <td className="p-2">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                        />
                                    </td>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {level.levelNumber}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                                        {level.name}
                                    </td>
                                    <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                        {level.remark}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                                        {level.users.map((u: any) => u.username).join(', ')}
                                    </td>
                                    <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                        <a href="#" className="text-blue-600 hover:text-blue-900">
                                            Edit
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>






            {/* --------------------- */}

            {/* <NewLevelForm key={1} isOpen={levelFormOpen} onClose={() => {
                setLevelFormOpen(false)
            }} setOpen={(val) => {
                setLevelFormOpen(val)
            }} /> */}


        </>
    )
}


const initialFormState = {
    levelName: '',
    remark: '',
}
function AddUserToLevelModal() {
    const [isOpen, setOpen] = useState(false)
    const [isUserSelectModalOpen, setIsUserSelectModalOpen] = useState(false)
    const [isDepartmentSelectModalOpen, setIsDepartmentSelectModalOpen] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState<any[]>([])
    const [selectedDepartments, setSelectedDepartments] = useState<any[]>([])
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
    async function getUsersByDepartmentId(id:string){
        try{
            const users = (await departmentService.getUsers(id)).data
            return users
        }catch(e){
            return []
        }
    }
    const handleSubmit = async (e: React.FormEvent) => {
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

        let finalUsers:any[] = [...selectedUsers]
        for(let department of selectedDepartments){
            let usersResponse:any = await getUsersByDepartmentId(department.id)
            const finalUserIds = finalUsers.map(u=>u.id)
            usersResponse = usersResponse.filter((u:any)=> !finalUserIds.includes(u.id))
            finalUsers = [...finalUsers,...usersResponse]
        }
        

        if (finalUsers.length < 1) {
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

        const newLevel: any = {
            levelNumber: levels.length + 1, // Update level number based on existing levels
            name: formState.levelName,
            remark: formState.remark,
            users: finalUsers.map((u: any) => {
                return { ...u, name: u.username }
            })
        }

        setLevels([newLevel, ...levels])

        console.log("Form Data:", newLevel)
        setFormState(initialFormState)

        setOpen && setOpen(false)
    }

    return (
        <>
            <Button className="m-2" onClick={() => {
                setOpen(true)
            }}>Add Users</Button>
            <Dialog open={isOpen && !isUserSelectModalOpen} onOpenChange={setOpen}>
                <DialogContent className="p-2">
                    <Card className="border-none shadow-none m-0">
                        <CardHeader>
                            <CardTitle>Share this document</CardTitle>
                            <CardDescription>
                                Anyone with the link can view this document.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
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
                            <div className="flex space-x-2">
                                <Button variant="secondary" className="shrink-0" onClick={() => {
                                    setIsUserSelectModalOpen(true)
                                }}>
                                    Add User
                                </Button>
                                <Button variant="secondary" className="shrink-0" onClick={() => {
                                    setIsDepartmentSelectModalOpen(true)
                                }}>
                                    Add Department/Team
                                </Button>
                            </div>


                            {selectedUsers?.length > 0 &&
                                <>
                                    <Separator className="my-4" />
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-medium">Selected Users</h4>
                                        <div className="grid gap-4">
                                            {selectedUsers.map(user => {
                                                if (!selectedDepartments.map(department => department.id).includes(user.department?.id)) {
                                                    return <UserComponent user={user} onRemoveUser={(id: string) => {
                                                        setSelectedUsers(selectedUsers.filter(user => {
                                                            return user.id != id
                                                        }))
                                                    }} />
                                                }
                                            })}

                                        </div>
                                    </div>
                                </>
                            }

                            {selectedDepartments?.length > 0 &&
                                <>
                                    <Separator className="my-4" />
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-medium">Selected Departments</h4>
                                        <div className="grid gap-1">
                                            {selectedDepartments.map(department => {
                                                return <DepartmentComponent department={department} onRemoveDepartment={(id: string) => {
                                                    setSelectedDepartments(selectedDepartments.filter(department => {
                                                        return department.id != id
                                                    }))
                                                }} />
                                            })}

                                        </div>
                                    </div>
                                </>
                            }
                        </CardContent>
                    </Card>
                    <DialogFooter>
                        <Button onClick={() => {
                            setOpen(false)
                        }}>Cancel</Button>
                        <Button onClick={handleSubmit}>Create Level</Button>
                    </DialogFooter>
                </DialogContent>


            </Dialog>


            <UserSelectModal open={isUserSelectModalOpen} setOpen={(open) => {
                setIsUserSelectModalOpen(open)
            }} onConfirm={(users) => {
                setSelectedUsers(users)
                setIsUserSelectModalOpen(false)
            }}
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
            />
            <DepartmentSelectModal open={isDepartmentSelectModalOpen} setOpen={(open) => {
                setIsDepartmentSelectModalOpen(open)
            }}
                selectedDepartments={selectedDepartments}
                setSelectedDepartments={setSelectedDepartments}
            />
        </>
    )


}


interface UserComponentProps {
    user: any,
    onRemoveUser: (id: string) => void
}
function UserComponent({
    user,
    onRemoveUser
}: UserComponentProps) {
    return <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4">
            <Avatar className="h-8 w-8">
                <AvatarImage src={`https://ui-avatars.com/api/?name=${user.username}&background=random`} />
                <AvatarFallback>{user.username[0]}</AvatarFallback>
            </Avatar>
            <div>
                <p className="text-sm font-medium leading-none">
                    {user.email}
                </p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>

        </div>
        <Button variant={'ghost'} onClick={() => {
            onRemoveUser(user.id)
        }}><MinusCircleIcon className="text-red-300 h-5 w-5" /></Button>
    </div>
}

interface DepartmentComponentProps {
    department: any,
    onRemoveDepartment: (id: string) => void
}
function DepartmentComponent({
    department,
    onRemoveDepartment
}: DepartmentComponentProps) {
    return <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4">
            <BuildingOfficeIcon className="h-5 w-5 text-blue-500" />
            <div>
                <p className="text-sm font-medium leading-none">
                    {department.name}
                </p>
                <p className="text-sm text-muted-foreground">{department.name}</p>
            </div>

        </div>
        <Button variant={'ghost'} onClick={() => {
            onRemoveDepartment(department.id)
        }}><MinusCircleIcon className="text-red-300 h-5 w-5" /></Button>
    </div>
}