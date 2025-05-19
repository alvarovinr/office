import React from 'react';
import { User } from '../../types';

interface UserAvatarProps {
  user: User | null;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, size = 'md' }) => {
  const sizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };
  
  const statusClasses = {
    xs: 'w-2 h-2',
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  const getAvatarUrl = (user: User | null) => {
    if (!user) return 'https://i.pravatar.cc/150?img=1';
    return `https://i.pravatar.cc/150?img=${user.avatarId || 1}`;
  };

  return (
    <div className="relative inline-block">
      <img
        src={getAvatarUrl(user)}
        alt={user?.name || 'User'}
        className={`${sizeClasses[size]} rounded-full object-cover border-2 border-white shadow-sm`}
      />
      {user?.isOnline && (
        <span className={`absolute bottom-0 right-0 block ${statusClasses[size]} rounded-full bg-green-500 ring-2 ring-white`}></span>
      )}
    </div>
  );
};

export default UserAvatar;