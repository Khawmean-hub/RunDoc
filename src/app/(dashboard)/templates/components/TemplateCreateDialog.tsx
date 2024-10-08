import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserSelectionDialog from './UserSelectionDialog';
import DynamicFormComponent from "./DynamicFormComponent";

interface UserData {
    id: string;
    username: string;
    email: string;
    profilePictureUrl: string | null;
}

interface Team {
    id: number;
    name: string;
    members: UserData[];
}

export default function TemplateCreateDialog() {
    const [open, setOpen] = useState(false);
    const [teams, setTeams] = useState<Team[]>([]);

    const handleAddMembers = (teamId: number, selectedUsers: UserData[]) => {
        setTeams(
            teams.map((team) =>
                team.id === teamId
                    ? { ...team, members: [...team.members, ...selectedUsers] }
                    : team
            )
        );
    };

    const handleRemoveMember = (teamId: number, userId: string) => {
        setTeams(
            teams.map((team) =>
                team.id === teamId
                    ? { ...team, members: team.members.filter(member => member.id !== userId) }
                    : team
            )
        );
    };

    const handleTeamNameChange = (id: number, newName: string) => {
        setTeams(
            teams.map((team) =>
                team.id === id ? { ...team, name: newName } : team
            )
        );
    };

    const handleAddTeam = () => {
        setTeams([...teams, { id: teams.length + 1, name: 'New Team', members: [] }]);
    };

    return (
        <Dialog modal={true} open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" size="icon" className='rounded-full h-12 w-12'>
                    <Plus />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] w-full max-h-[95vh] p-0 flex flex-col h-[95vh]">
                <DialogHeader className="flex flex-row justify-between items-center p-6 border-b bg-white">
                    <h6 className="font-medium text-xl">New Template</h6>
                    <div className="flex gap-2">
                        <Button variant={'secondary'} onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant={'default'}>
                            Create
                        </Button>
                    </div>
                </DialogHeader>
                <div className="overflow-hidden grid grid-cols-2">
                    <ScrollArea>
                        <DynamicFormComponent />
                    </ScrollArea>
                    <ScrollArea>
                        <div className="p-6 space-y-4">
                            <h2 className="font-medium text-lg">Participants</h2>
                            {teams.map((team) => (
                                <div key={team.id} className="bg-white rounded-lg border p-4">
                                    <div className="flex justify-between items-center pb-3 mb-3">
                                        <input
                                            type="text"
                                            className="font-semibold bg-transparent border-none focus:outline-none focus:ring-0 p-0 text-sm"
                                            value={team.name}
                                            onChange={(e) => handleTeamNameChange(team.id, e.target.value)}
                                        />
                                        <UserSelectionDialog onConfirm={(selectedUsers) => handleAddMembers(team.id, selectedUsers)} />
                                    </div>
                                    {team.members.length > 0 && (
                                        <div className="space-y-2">
                                            {team.members.map((member) => (
                                                <div
                                                    key={member.id}
                                                    className="flex items-center justify-between p-2 rounded-md border"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage src={member.profilePictureUrl || `https://ui-avatars.com/api/?name=${member.username}&background=random`} alt={member.username} />
                                                            <AvatarFallback>{member.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-700">{member.username}</p>
                                                            <p className="text-xs text-gray-500">{member.email}</p>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        variant="link"
                                                        className="text-xs font-normal text-gray-600"
                                                        onClick={() => handleRemoveMember(team.id, member.id)}
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <Button
                                variant="outline"
                                onClick={handleAddTeam}
                                className="w-full"
                            >
                                <Plus className="h-4 w-4 mr-2" /> New Level/Team
                            </Button>
                        </div>
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    );
}