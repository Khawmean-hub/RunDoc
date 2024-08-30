"use client"
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
import { useState } from "react";
import UserSelectModal from "./components/UserSelectModal";
import DepartmentSelectModal from "./components/DepartmentSelectModal";
import { BuildingOfficeIcon, TrashIcon } from "@heroicons/react/24/solid";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
export default function AddUserToLevelModal() {
    const [isOpen, setOpen] = useState(false)
    const [isUserSelectModalOpen, setIsUserSelectModalOpen] = useState(false)
    const [isDepartmentSelectModalOpen, setIsDepartmentSelectModalOpen] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState<any[]>([])
    const [selectedDepartments, setSelectedDepartments] = useState<any[]>([])

    return (
        <>
            <Button className="m-2" onClick={() => {
                setOpen(true)
            }}>Open</Button>
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
                            <div className="flex space-x-2">
                                <Button variant="default" className="shrink-0" onClick={() => {
                                    setIsUserSelectModalOpen(true)
                                }}>
                                    Add User
                                </Button>
                                <Button variant="default" className="shrink-0" onClick={() => {
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
                                                if(!selectedDepartments.map(department=>department.id).includes(user.department?.id)){
                                                    return <UserComponent key={user?.id} user={user} onRemoveUser={(id: string) => {
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
                                                return <DepartmentComponent key={department?.id} department={department} onRemoveDepartment={(id: string) => {
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
        <BuildingOfficeIcon className="h-5 w-5 text-blue-500"/>
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