"use client"
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';


const firstNames = ['Alex', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Blake'];
const lastNames = ['Smith', 'Johnson', 'Brown', 'Williams', 'Jones', 'Davis'];
const generateRandomName = () => {
  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${randomFirstName} ${randomLastName}`;
};

const DocumentUI = () => {
  const [teams, setTeams] = useState([
    { id: 1, name: 'Team AAA', members: 4 },
    { id: 2, name: 'Team BBBBB', members: 5 },
    { id: 3, name: 'Team CCCC', members: 6 },
    { id: 4, name: 'CEO', members: 1 },
  ]);
  return (
    <>
      <nav className="bg-white ">
        <div className="max-w-7xl px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-16 bg-green-500 shadow-md rounded-lg mr-2"></div>
                  <h1 className="text-2xl font-bold">Document AAA</h1>
                  <span className="text-yellow-500">★</span>
                </div>
              </div>
              <div className="ml-6 flex space-x-8">
                <a href="#" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Form Information
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Comment
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  File
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Activity
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex p-4 gap-4">
        <div className="flex-grow rounded-lg">
          <div className=" mx-auto  bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value="AAABBBCCC"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Types</label>
                <div className="bg-gray-100 p-2 rounded-md">
                  <span className="text-sm text-gray-800">Start Document</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <input
                  type="text"
                  value="Untitled question AA"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  readOnly
                />
              </div>
              <div>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows={3}
                  value="Short answer Short answer Short answer Short answer Short answer Short answer Short answer Short answer"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-4/12 border border-gray-300 rounded-lg shadow">
          <div className="p-4 space-y-2">
            <h2 className="font-medium">Participants</h2>
            {teams.map((team: any) => (
              <div key={team.id} className="bg-white border-b p-4">
                <div className="flex justify-between items-center border-gray-200 pb-3 mb-3">
                  <input
                    type="text"
                    className="font-semibold bg-transparent border-none focus:outline-none focus:ring-0 p-0 text-sm"
                    value={team.name}
                  />
                  <Button
                    size={'sm'}
                    variant="secondary"
                    className="rounded-full text-xs bg-orange-400 text-white"

                  >
                    Feedback
                  </Button>
                </div>
                {team.members > 0 && (
                  <div className="space-y-1">
                    {[...Array(team.members)].map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2  rounded-md"
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
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentUI;