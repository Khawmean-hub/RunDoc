"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserSelectionDialog from '../components/UserSelectionDialog';
import DynamicFormComponent from '../components/DynamicFormComponent';
import { documentTemplateService } from '@/services';


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

interface Question {
    id: string;
    type: 'shortAnswer' | 'paragraph' | 'multipleChoice' | 'checkbox' | 'dropdown' | 'section';
    title: string;
    required: boolean;
    description?: string;
    options?: { id: string; value: string }[];
}

interface RunDocForm {
    id: string;
    title: string;
    description?: string;
    questions: Question[];
}

export default function TemplateCreatePage() {
    const [formData, setFormData] = useState<RunDocForm | null>(null);
    const [teams, setTeams] = useState<Team[]>([]);


    const handleCreateTemplate = async () => {
        if (!formData) {
            console.error('Form data is missing');
            return;
        }

        const templateData = {
            title: formData.title,
            levels: teams.map((team, index) => ({
                name: team.name,
                level_number: index,
                users: team.members.map(member => ({
                    id: member.id,
                    username: member.username,
                    email: member.email,
                })),
                departments: [], // Assuming no department data is available in the current implementation
                remark: ''
            })),
            form_data: formData
        };

        try {
            const response = await documentTemplateService.create(templateData);
            alert('Template created successfully:'+response);
            // Handle successful creation (e.g., show a success message, redirect to template list)
        } catch (error) {
            alert('Error creating template:'+ error);
            // Handle error (e.g., show an error message to the user)
        }
    };

    const handleFormDataChange = (newFormData: RunDocForm) => {
        setFormData(newFormData);
    };
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
        <>
            <div className="container mx-auto p-6">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">New Template</h1>
                    <div className="flex gap-2">
                        <Button variant={'secondary'} onClick={() => window.history.back()}>
                            Cancel
                        </Button>
                        <Button variant={'default'} onClick={handleCreateTemplate}>
                            Create
                        </Button>
                    </div>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ScrollArea className="h-[calc(100vh-200px)]">
                        <DynamicFormComponent onFormChange={handleFormDataChange} />
                    </ScrollArea>
                    <ScrollArea className="h-[calc(100vh-200px)]">
                        <div className="space-y-4">
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
            </div>
        </>
    );
}