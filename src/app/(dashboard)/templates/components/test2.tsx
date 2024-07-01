import { Dialog, DialogContent, DialogOverlay, DialogTitle } from '@/components/ui/dialog';
import React, { useState } from 'react';


const TeamManagementDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [teams, setTeams] = useState([
    { id: 1, name: 'Team AAA', members: 4 },
    { id: 2, name: 'Team BBBBB', members: 5 },
    { id: 3, name: 'Team CCCC', members: 6 },
    { id: 4, name: 'CEO', members: 1 },
  ]);
  const [memberCounter, setMemberCounter] = useState(2);

  const handleAddTeam = () => {
    setTeams([...teams, { id: teams.length + 1, name: 'New Team', members: 0 }]);
  };

  const handleAddMember = (teamId:any) => {
    setTeams(
      teams.map((team) =>
        team.id === teamId
          ? { ...team, members: team.members + 1 }
          : team
      )
    );
    setMemberCounter(memberCounter + 1);
  };

  const handleRemoveMember = (teamId:any) => {
    setTeams(
      teams.map((team) =>
        team.id === teamId && team.members > 0
          ? { ...team, members: team.members - 1 }
          : team
      )
    );
  };

  const handleTeamNameChange = (id:any, newName:any) => {
    setTeams(
      teams.map((team) =>
        team.id === id ? { ...team, name: newName } : team
      )
    );
  };

  return (
    <div className="p-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => setIsOpen(true)}
      >
        Manage Teams
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50" />
        <DialogContent className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <DialogTitle className="text-xl font-bold mb-4">
            Level/Team Participants
          </DialogTitle>

          {teams.map((team) => (
            <div key={team.id} className="mb-4">
              <div className="flex justify-between items-center border-b pb-2 mb-2">
                <input
                  type="text"
                  className="font-semibold bg-transparent border-none focus:outline-none focus:ring-0"
                  value={team.name}
                  onChange={(e) =>
                    handleTeamNameChange(team.id, e.target.value)
                  }
                />
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">{team.members}</span>
                  <button
                    className="text-blue-500"
                    onClick={() => handleAddMember(team.id)}
                  >
                    +
                  </button>
                </div>
              </div>
              {team.members > 0 && (
                <div className="space-y-2">
                  {[...Array(team.members)].map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-100 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-gray-600">
                          M
                        </div>
                        <div className="ml-2">
                          <p className="text-sm font-semibold">Member {index + 1}</p>
                          <p className="text-xs text-gray-600">Role</p>
                        </div>
                      </div>
                      <button
                        className="text-red-500"
                        onClick={() => handleRemoveMember(team.id)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button
            className="text-blue-500 mt-4"
            onClick={handleAddTeam}
          >
            + New Level/Team
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamManagementDialog;
