import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, MoreVertical, Palette, Plus, Trash2, X } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";

const teams:any = [
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

export default function TemplateCreateDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog modal={true} open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Add template</Button>
            </DialogTrigger>
            <DialogContent className="h-[calc(100%-6rem)] min-w-[calc(100%-6rem)] p-0 overflow-hidden">
                <DialogHeader className="flex-row max-h-16 items-center p-6 border-b bg-white z-10">
                    <h6 className="font-medium text-xl">New Template</h6>
                    <div className="ml-auto"></div>
                    <div className="flex gap-2">
                        <Button variant={'secondary'} onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant={'default'}>
                            Create
                        </Button>
                    </div>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 h-full overflow-y-auto gap-3">
                    <ScrollArea className="h-full overflow-y-auto p-4 pt-0">
                        <div className="border rounded-md">
                            <div className="bg-green-500 p-2 flex items-center justify-center h-24">
                                {/* Optional: Add content or icon here */}
                            </div>
                            <div className="p-4">
                                <div className="grid gap-4">
                                    <div className="grid w-full items-center gap-1">
                                        <Label htmlFor="color" className="text-xs font-normal">Color</Label>
                                        <div>
                                            <Button size={'sm'} variant={'secondary'} className="text-green-600 bg-green-50">
                                                <Palette className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="grid items-center gap-1 max-w-[400px]">
                                        <Label htmlFor="type" className="text-xs font-normal">Type</Label>
                                        <Select>
                                            <SelectTrigger className="h-9">
                                                <SelectValue placeholder="Select a type" className="text-xs" />
                                            </SelectTrigger>
                                            <SelectContent className="text-xs">
                                                <SelectGroup>
                                                    <SelectLabel>Types</SelectLabel>
                                                    <SelectItem value="type1">Type 1</SelectItem>
                                                    <SelectItem value="type2">Type 2</SelectItem>
                                                    <SelectItem value="type3">Type 3</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid w-full items-center gap-1">
                                        <Label htmlFor="name" className="text-xs font-normal">Name</Label>
                                        <Input id="name" placeholder="Enter name" className="h-9" />
                                    </div>
                                    <div className="grid w-full items-center gap-1">
                                        <Label htmlFor="description" className="text-xs font-normal">Description</Label>
                                        <Input id="description" placeholder="Enter description" className="h-9" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                    <ScrollArea className="h-full overflow-y-auto p-4 pt-0">
                        <div className="border rounded-md p-4">
                            <h3 className="text-lg font-semibold mb-4">Settings</h3>
                            <div className="grid gap-4">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="private" className="text-sm">Private</Label>
                                    <Switch id="private" />
                                </div>
                                <div className="grid w-full items-center gap-1">
                                    <Label htmlFor="team" className="text-xs font-normal">Team</Label>
                                    <Select>
                                        <SelectTrigger className="h-9">
                                            <SelectValue placeholder="Select a team" className="text-xs" />
                                        </SelectTrigger>
                                        <SelectContent className="text-xs">
                                            <SelectGroup>
                                                <SelectLabel>Teams</SelectLabel>
                                                {teams.map((team:any) => (
                                                    <SelectItem key={team.id} value={team.id.toString()}>
                                                        {team.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid w-full items-center gap-1">
                                    <Label htmlFor="members" className="text-xs font-normal">Members</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {teams[1].members.map((member:any, index:any) => (
                                            <div key={index} className="flex items-center bg-gray-100 rounded-full p-1">
                                                <img src={member.image} alt={member.name} className="w-6 h-6 rounded-full mr-2" />
                                                <span className="text-xs">{member.name}</span>
                                                <Button size="sm" variant="ghost" className="ml-1 p-0">
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button size="sm" variant="outline" className="rounded-full">
                                            <Plus className="h-4 w-4 mr-1" /> Add
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    );
}
