import React from 'react';
import { X } from 'lucide-react';
import { useOffice } from '../../contexts/OfficeContext';
import { useUser } from '../../contexts/UserContext';
import UserAvatar from './UserAvatar';

interface OnlineUsersProps {
  onClose: () => void;
}

const OnlineUsers: React.FC<OnlineUsersProps> = ({ onClose }) => {
  const { onlineUsers } = useOffice();
  const { currentUser } = useUser();
  
  // Combine currentUser with online users for display
  const allUsers = currentUser ? 
    [currentUser, ...onlineUsers.filter(u => u.id !== currentUser.id)] : 
    onlineUsers;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Online Users</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 max-h-96 overflow-y-auto">
          {allUsers.length > 0 ? (
            <ul className="space-y-3">
              {allUsers.map(user => (
                <li key={user.id} className="flex items-center p-2 hover:bg-gray-50 rounded-lg">
                  <UserAvatar user={user} size="md" />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">
                      {user.name} {user.id === currentUser?.id ? '(You)' : ''}
                    </p>
                    <p className="text-sm text-gray-600">
                      {user.department !== 'none' ? user.department : 'No department'}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <div className="text-xs text-gray-500">
                      {user.position.areaId}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-6 text-gray-500">
              No users are currently online
            </div>
          )}
        </div>
        
        <div className="border-t p-4 bg-gray-50 rounded-b-lg">
          <p className="text-sm text-gray-600">
            {allUsers.length} {allUsers.length === 1 ? 'user' : 'users'} online
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnlineUsers;