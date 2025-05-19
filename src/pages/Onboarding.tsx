import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle2 } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { Department } from '../types';

const avatarOptions = [
  { id: 1, url: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, url: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, url: 'https://i.pravatar.cc/150?img=3' },
  { id: 4, url: 'https://i.pravatar.cc/150?img=4' },
  { id: 5, url: 'https://i.pravatar.cc/150?img=5' },
  { id: 6, url: 'https://i.pravatar.cc/150?img=6' },
];

const Onboarding: React.FC = () => {
  const { currentUser, updateUserAvatar, updateUserDepartment } = useUser();
  const [selectedAvatarId, setSelectedAvatarId] = useState<number>(currentUser?.avatarId || 1);
  const [selectedDepartment, setSelectedDepartment] = useState<Department>(currentUser?.department || Department.None);
  const navigate = useNavigate();

  const handleComplete = () => {
    updateUserAvatar(selectedAvatarId);
    updateUserDepartment(selectedDepartment);
    navigate('/office');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-4 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-600 p-3 rounded-full">
              <UserCircle2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome to Virtual Office</h1>
          <p className="text-gray-600 mt-2">Let's set up your profile before entering the virtual workspace</p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Choose your avatar</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {avatarOptions.map((avatar) => (
              <button
                key={avatar.id}
                onClick={() => setSelectedAvatarId(avatar.id)}
                className={`relative overflow-hidden rounded-full aspect-square transition duration-200 ${
                  selectedAvatarId === avatar.id
                    ? 'ring-4 ring-indigo-500 scale-110'
                    : 'hover:scale-105'
                }`}
              >
                <img
                  src={avatar.url}
                  alt={`Avatar option ${avatar.id}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Select your department</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(Department)
              .filter(([key]) => key !== 'None')
              .map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setSelectedDepartment(value)}
                  className={`p-3 rounded-lg border transition duration-200 ${
                    selectedDepartment === value
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {key}
                </button>
              ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleComplete}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition duration-200 transform hover:scale-[1.02]"
          >
            Enter Virtual Office
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;