import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { LogOut, Settings, MessageSquare, Users } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useOffice } from '../contexts/OfficeContext';
import OfficeMap from '../components/office/OfficeMap';
import DepartmentWorkspace from '../components/workspace/DepartmentWorkspace';
import AgentChat from '../components/agents/AgentChat';
import UserAvatar from '../components/shared/UserAvatar';
import OnlineUsers from '../components/shared/OnlineUsers';

const Office: React.FC = () => {
  const { currentUser, logout } = useUser();
  const { currentAreaId, getAreaById } = useOffice();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showOnlineUsers, setShowOnlineUsers] = useState(false);
  const navigate = useNavigate();
  
  const currentArea = getAreaById(currentAreaId);
  const areaColor = currentArea?.color || '#4f46e5';
  
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 transform ${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 z-30 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="flex items-center">
              <div className="mr-3">
                <UserAvatar user={currentUser} size="md" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">{currentUser?.name}</h2>
                <p className="text-sm text-gray-600">{currentUser?.department}</p>
              </div>
            </div>
          </div>
          
          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            <ul className="space-y-1">
              <li>
                <button 
                  className="flex items-center w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                  onClick={() => navigate('/office')}
                >
                  Office Map
                </button>
              </li>
              <li>
                <button 
                  className="flex items-center w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                  onClick={() => navigate('/office/workspace')}
                >
                  My Workspace
                </button>
              </li>
              <li>
                <button 
                  className="flex items-center w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                  onClick={() => navigate('/office/chat')}
                >
                  <MessageSquare className="w-5 h-5 mr-3" />
                  Agent Chat
                </button>
              </li>
              <li>
                <button 
                  className="flex items-center w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                  onClick={() => setShowOnlineUsers(true)}
                >
                  <Users className="w-5 h-5 mr-3" />
                  Online Users
                </button>
              </li>
            </ul>
          </nav>
          
          <div className="p-4 border-t">
            <div className="flex items-center justify-between">
              <button 
                className="flex items-center text-gray-700 hover:text-gray-900"
                onClick={() => {/* Settings functionality */}}
              >
                <Settings className="w-5 h-5 mr-2" />
                Settings
              </button>
              <button 
                className="flex items-center text-red-600 hover:text-red-800"
                onClick={logout}
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header 
          className="flex justify-between items-center px-4 h-16 bg-white shadow-sm z-10"
          style={{ borderBottom: `3px solid ${areaColor}` }}
        >
          <div className="flex items-center">
            <button 
              className="p-1 mr-4 rounded-md hover:bg-gray-100 md:hidden"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-gray-900">{currentArea?.name || 'Virtual Office'}</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 relative"
              onClick={() => setShowOnlineUsers(!showOnlineUsers)}
            >
              <Users className="w-5 h-5 text-gray-700" />
              <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-500"></span>
            </button>
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <Routes>
            <Route path="/" element={<OfficeMap />} />
            <Route path="/workspace" element={<DepartmentWorkspace />} />
            <Route path="/chat" element={<AgentChat />} />
          </Routes>
        </main>
      </div>
      
      {/* Online Users Overlay */}
      {showOnlineUsers && (
        <OnlineUsers onClose={() => setShowOnlineUsers(false)} />
      )}
      
      {/* Background Overlay for Mobile */}
      {showSidebar && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 md:hidden"
          onClick={() => setShowSidebar(false)}
        ></div>
      )}
    </div>
  );
};

export default Office;