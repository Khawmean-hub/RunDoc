
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronDown, MoreVertical, Palette, Plus, PlusIcon, Trash2, X } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react";


const firstNames = ['Alex', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Blake'];
const lastNames = ['Smith', 'Johnson', 'Brown', 'Williams', 'Jones', 'Davis'];
const generateRandomName = () => {
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${randomFirstName} ${randomLastName}`;
};

const teams = [
    { id: 1, name: 'Team AAA', participants: 4 },
    {
        id: 2, name: 'Team BBBBB', participants: 5, members: [
            { name: 'Vitou', role: 'Business Manager', image: '/api/placeholder/40/40' },
            { name: 'Vitou', role: 'Business Manager', image: '/api/placeholder/40/40' },
        ]
    },
    { id: 3, name: 'Team CCCC', participants: 6 },
    { id: 4, name: 'CEO', participants: 1 },
];

export default function Teams() {
    const [teams, setTeams] = useState([
        { id: 1, name: 'Team AAA', members: 4 },
        { id: 2, name: 'Team BBBBB', members: 5 },
        { id: 3, name: 'Team CCCC', members: 6 },
        { id: 4, name: 'CEO', members: 1 },
    ]);


    const handleAddMember = (teamId: any) => {
        setTeams(
            teams.map((team) =>
                team.id === teamId
                    ? { ...team, members: team.members + 1 }
                    : team
            )
        );
    };

    const handleRemoveMember = (teamId: any) => {
        setTeams(
            teams.map((team) =>
                team.id === teamId && team.members > 0
                    ? { ...team, members: team.members - 1 }
                    : team
            )
        );
    };

    const handleTeamNameChange = (id: any, newName: any) => {
        setTeams(
            teams.map((team) =>
                team.id === id ? { ...team, name: newName } : team
            )
        );
    };
    const handleAddTeam = () => {
        setTeams([...teams, { id: teams.length + 1, name: 'New Team', members: 0 }]);
    };
    const firstNames = ['Alex', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Blake'];
    const lastNames = ['Smith', 'Johnson', 'Brown', 'Williams', 'Jones', 'Davis'];
    const generateRandomName = () => {
        const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        return `${randomFirstName} ${randomLastName}`;
    };

    return <ScrollArea className="w-full max-h-[calc(100vh-4rem)]">
        <div className="p-4 space-y-2">
            <h2 className="font-medium">Participants</h2>
            {teams.map((team) => (
                <div key={team.id} className="bg-white rounded-lg border p-4">
                    <div className="flex justify-between items-center border-gray-200 pb-3 mb-3">
                        <input
                            type="text"
                            className="font-semibold bg-transparent border-none focus:outline-none focus:ring-0 p-0 text-sm"
                            value={team.name}
                            onChange={(e) => handleTeamNameChange(team.id, e.target.value)}
                        />
                        <Button
                            size={'icon'}
                            variant="secondary"
                            className="rounded-full h-8 w-8"
                            onClick={() => handleAddMember(team.id)}
                        >
                            <PlusIcon className="h-4 w-4 text-gray-600" />
                        </Button>
                    </div>
                    {team.members > 0 && (
                        <div className="space-y-1">
                            {[...Array(team.members)].map((_, index) => (
                                <div
                                    key={index}
                                    className="border flex items-center justify-between p-2  rounded-md"
                                >
                                    <div className="flex items-center space-x-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={`https://ui-avatars.com/api/?name=${generateRandomName()}&background=random`} alt="@shadcn" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">{generateRandomName()}</p>
                                            <p className="text-xs text-gray-500">Role</p>
                                        </div>
                                    </div>


                                    <Button variant="ghost"
                                        size="icon" className="h-4 w-4 text-gray-400">
                                        <X />
                                    </Button>
                                    {/* <Button
                                        size="sm"
                                        variant="link"
                                        className="text-xs font-normal text-red-600"
                                        onClick={() => handleRemoveMember(team.id)}
                                    >
                                        Remove
                                    </Button> */}
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
}