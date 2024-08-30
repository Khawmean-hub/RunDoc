import { DialogContent, DialogDescription, DialogFooter, DialogHeader, Dialog, DialogTitle } from '@/components/ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { adminService } from '@/services';

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
]

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    setOpen?: (val: boolean) => void
}

type User = (typeof users)[number]

export default function AddUserToLevelModal({ isOpen, setOpen,onSubmit,users:_user }: ModalProps | any) {

    const [users,setUsers] = useState(_user || [])

    function getUsers() {
        adminService.getUsers().then(response => {
            console.log(response.data)
            setUsers(response.data)
        }).catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        getUsers()
    }, [])

    const [selectedUsers, setSelectedUsers] = React.useState<any>([])

    return <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className="gap-0 p-0 outline-none">
            <DialogHeader className="px-4 pb-4 pt-5">
                <DialogTitle>Add User</DialogTitle>
                <DialogDescription>
                    Invite a user to this level.
                </DialogDescription>
            </DialogHeader>
            <Command className="overflow-hidden rounded-t-none border-t">
                <CommandInput placeholder="Search user..." />
                <CommandList>
                    <CommandEmpty>No users found.</CommandEmpty>
                    <CommandGroup className="p-2">
                        {users?.map((user: any) => (
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
                                {/* <Avatar>
                                    <AvatarImage src={user.avatar} alt="Image" />
                                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                                </Avatar> */}
                                <div className="ml-2">
                                    <p className="text-sm font-medium leading-none">
                                        {user.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {user.email}
                                    </p>
                                </div>
                                {selectedUsers.includes(user) ? (
                                    <Check className="ml-auto flex h-5 w-5 text-primary" />
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
                                <AvatarImage src={`https://ui-avatars.com/api/?name=${user.username}`} />
                                <AvatarFallback>{user.username?.[0]}</AvatarFallback>
                            </Avatar>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">
                        Select users to add to this level.
                    </p>
                )}
                <Button
                    disabled={selectedUsers.length < 1}
                    onClick={() => {
                        onSubmit(selectedUsers)
                        setOpen(false)
                        setSelectedUsers([])
                    }}
                >
                    Continue
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}