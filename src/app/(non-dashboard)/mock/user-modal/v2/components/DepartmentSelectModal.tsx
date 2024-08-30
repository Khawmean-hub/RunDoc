"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { departmentService } from "@/services"
import { BuildingOfficeIcon } from "@heroicons/react/24/outline"
import { CheckCircleIcon } from "@heroicons/react/24/solid"
import { Check } from "lucide-react"
import { useEffect, useState } from "react"


const users = [
    {
        name: "Olivia Martin",
        email: "m@example.com",
        avatar: "/avatars/01.png",
    },
    {
        name: "Isabella Nguyen",
        email: "isabella.nguyen@email.com",
        avatar: "/avatars/03.png",
    },
    {
        name: "Emma Wilson",
        email: "emma@example.com",
        avatar: "/avatars/05.png",
    },
    {
        name: "Jackson Lee",
        email: "lee@example.com",
        avatar: "/avatars/02.png",
    },
    {
        name: "William Kim",
        email: "will@email.com",
        avatar: "/avatars/04.png",
    },
] as const
type User = (typeof users)[number]
interface UserSelectModalProps {
    open: boolean,
    setOpen: (open: boolean) => void,
    selectedDepartments: any,
    setSelectedDepartments: any
}
export default function DepartmentSelectModal({
    open,
    setOpen,
    selectedDepartments,
    setSelectedDepartments
}: UserSelectModalProps) {
    const [departments, setDepartments] = useState<any[]>([])

    useEffect(() => {
        getDepartments()
    }, [])
    function getDepartments() {
        departmentService.list().then(response => {
            setDepartments(response.data)
        }).catch(err => {
            console.log(err)
        })
    }
    return <>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="gap-0 p-0 outline-none">
                <DialogHeader className="px-4 pb-4 pt-5">
                    <DialogTitle>Select Departments</DialogTitle>
                    <DialogDescription>
                        Add departments to this level.
                    </DialogDescription>
                </DialogHeader>
                <Command className="overflow-hidden rounded-t-none border-t">
                    <CommandInput placeholder="Search department..." />
                    <CommandList>
                        <CommandEmpty>No departments found.</CommandEmpty>
                        <CommandGroup className="p-2">
                            {departments.map((department: any) => (
                                <CommandItem
                                    key={department.id}
                                    className="flex items-center px-2"
                                    onSelect={() => {
                                        if (selectedDepartments.includes(department)) {
                                            return setSelectedDepartments(
                                                selectedDepartments.filter(
                                                    (selectedDepartment: any) => selectedDepartment !== department
                                                )
                                            )
                                        }

                                        return setSelectedDepartments(
                                            [...departments].filter((d) =>
                                                [...selectedDepartments, department].includes(d)
                                            )
                                        )
                                    }}
                                >
                                    <BuildingOfficeIcon className="h-5 w-5 text-blue-500"/>
                                    <div className="ml-2 p-1">
                                        <p className="text-sm font-medium leading-none text-gray-700">
                                            {department.name}
                                        </p>
                                        <p className="text-gray-700 text-xs text-muted-foreground">
                                            Users {department.usersCount}
                                        </p>
                                    </div>
                                    {selectedDepartments.includes(department) ? (
                                         <CheckCircleIcon className="ml-auto flex h-5 w-5 text-green-500" />
                                    ) : null}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
                <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
                    {selectedDepartments.length > 0 ? (
                        <div className="flex -space-x-2 overflow-hidden gap-4">
                            {selectedDepartments.map((department: any) => (
                                <div key={department?.id} className="flex items-center p-2 border gap-1 rounded-sm border-blue-500 text-sm">
                                    <BuildingOfficeIcon className="h-5 w-5 text-blue-500"/>
                                    {department.name}
                                    <p className="text-xs text-muted-foreground">Users {department.usersCount}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            Select department to add to the level.
                        </p>
                    )}
                    <Button
                        disabled={selectedDepartments.length < 1}
                        onClick={() => {
                            setOpen(false)
                        }}
                    >
                        Continue
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
}