"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { adminService } from "@/services"
import { CheckCircleIcon } from "@heroicons/react/24/solid"
import { LucideCheckCircle2 } from "lucide-react"
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
    onConfirm: (users:any[])=>void,
    selectedUsers:any,
    setSelectedUsers:any
}
export default function UserSelectModal({
    open,
    setOpen,
    onConfirm,
    selectedUsers,
    setSelectedUsers
}: UserSelectModalProps) {
    const [users,setUsers] = useState<any[]>([])

    useEffect(() => {
        getUsers()
    }, [])


    function getUsers() {
        adminService.getUsers().then(response => {
            setUsers(response.data)
        }).catch(err => {
            console.log(err)
        })
    }
    return <>

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="gap-0 p-0 outline-none">
                <DialogHeader className="px-4 pb-4 pt-5">
                    <DialogTitle>New message</DialogTitle>
                    <DialogDescription>
                        Invite a user to this thread. This will create a new group
                        message.
                    </DialogDescription>
                </DialogHeader>
                <Command className="overflow-hidden rounded-t-none border-t">
                    <CommandInput placeholder="Search user..." />
                    <CommandList>
                        <CommandEmpty>No users found.</CommandEmpty>
                        <CommandGroup className="p-2">
                            {users.map((user) => (
                                <CommandItem
                                    key={user.email}
                                    className="flex items-center px-2"
                                    onSelect={() => {
                                        if (selectedUsers.includes(user)) {
                                            return setSelectedUsers(
                                                selectedUsers.filter(
                                                    (selectedUser:any) => selectedUser !== user
                                                )
                                            )
                                        }

                                        return setSelectedUsers(
                                            [...users].filter((u) =>
                                                [...selectedUsers, user].includes(u)
                                            )
                                        )
                                    }}
                                >
                                    <Avatar>
                                        <AvatarImage src={`https://ui-avatars.com/api/?name=${user.username}&background=random`} alt="Image" />
                                        <AvatarFallback>{user.username[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-2">
                                        <p className="text-sm font-medium leading-none">
                                            {user.username}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </div>
                                    {selectedUsers.includes(user) ? (
                                        <CheckCircleIcon className="ml-auto flex h-5 w-5 text-green-500" />
                                    ) : null}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
                <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
                    {selectedUsers.length > 0 ? (
                        <div className="flex -space-x-2 overflow-hidden">
                            {selectedUsers.map((user:any) => (
                                <Avatar
                                    key={user.email}
                                    className="inline-block border-2 border-background"
                                >
                                    <AvatarImage src={`https://ui-avatars.com/api/?name=${user.username}&background=random`} />
                                    <AvatarFallback>{user.username[0]}</AvatarFallback>
                                </Avatar>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            Select users to add to this thread.
                        </p>
                    )}
                    <Button
                        disabled={selectedUsers.length < 2}
                        onClick={() => {
                            onConfirm(selectedUsers)
                        }}
                    >
                        Continue
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
}