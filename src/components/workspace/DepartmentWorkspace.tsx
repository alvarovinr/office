import React, { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { useOffice } from '../../contexts/OfficeContext';
import { WorkspaceItem, Department } from '../../types';
import WorkspaceHeader from './WorkspaceHeader';
import WorkspaceNav from './WorkspaceNav';
import WorkspaceKanban from './WorkspaceKanban';
import WorkspaceNotes from './WorkspaceNotes';
import WorkspaceKPI from './WorkspaceKPI';
import AgentAssistant from '../agents/AgentAssistant';

type WorkspaceView = 'kanban' | 'notes' | 'kpi' | 'files';

const DepartmentWorkspace: React.FC = () => {
  const { currentUser } = useUser();
  const { getAgentByDepartment, getWorkspaceItemsByDepartment } = useOffice();
  const [currentView, setCurrentView] = useState<WorkspaceView>('kanban');
  
  const userDepartment = currentUser?.department || Department.None;
  const departmentAgent = getAgentByDepartment(userDepartment);
  const workspaceItems = getWorkspaceItemsByDepartment(userDepartment);
  
  // Mock data for demonstration
  const mockTasks: WorkspaceItem[] = [
    {
      id: 'task-1',
      type: 'task',
      title: 'Create marketing campaign',
      content: 'Develop a new marketing campaign for Q3',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: currentUser?.id || '',
      department: userDepartment,
      tags: ['marketing', 'campaign']
    },
    {
      id: 'task-2',
      type: 'task',
      title: 'Social media strategy',
      content: 'Develop strategy for Instagram',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: currentUser?.id || '',
      department: userDepartment,
      tags: ['social', 'instagram']
    },
    {
      id: 'note-1',
      type: 'note',
      title: 'Department Meeting Notes',
      content: 'Discussed Q2 goals and assigned responsibilities',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: currentUser?.id || '',
      department: userDepartment,
      tags: ['meeting', 'notes']
    },
    {
      id: 'kpi-1',
      type: 'kpi',
      title: 'Website Conversion Rate',
      content: '3.2%',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: currentUser?.id || '',
      department: userDepartment,
      tags: ['metrics', 'website']
    },
  ];
  
  // Combine mock data with any existing workspace items
  const allItems = [...workspaceItems, ...mockTasks];
  
  return (
    <div className="h-full flex flex-col">
      <WorkspaceHeader 
        departmentName={userDepartment} 
        agentName={departmentAgent?.name}
      />
      
      <div className="flex-1 flex mt-4 gap-4 flex-col lg:flex-row">
        <div className="lg:w-1/4">
          <WorkspaceNav 
            currentView={currentView}
            setCurrentView={setCurrentView}
          />
          
          <div className="mt-4 bg-white rounded-lg shadow-sm p-4">
            {departmentAgent && (
              <AgentAssistant agent={departmentAgent} />
            )}
          </div>
        </div>
        
        <div className="lg:w-3/4 bg-white rounded-lg shadow-sm flex-1 overflow-hidden">
          {currentView === 'kanban' && <WorkspaceKanban items={allItems.filter(item => item.type === 'task')} />}
          {currentView === 'notes' && <WorkspaceNotes items={allItems.filter(item => item.type === 'note')} />}
          {currentView === 'kpi' && <WorkspaceKPI items={allItems.filter(item => item.type === 'kpi')} />}
          {currentView === 'files' && (
            <div className="p-6 text-center text-gray-500">
              File management functionality coming soon
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentWorkspace;