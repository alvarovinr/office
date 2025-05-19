import React, { createContext, useContext, useState } from 'react';
import { OfficeArea, AreaType, Department, Agent, User, WorkspaceItem } from '../types';
import { defaultOfficeAreas } from '../data/officeAreas';
import { defaultAgents } from '../data/agents';

interface OfficeContextType {
  areas: OfficeArea[];
  agents: Agent[];
  onlineUsers: User[];
  currentAreaId: string;
  activeWorkspaceItems: WorkspaceItem[];
  setCurrentAreaId: (areaId: string) => void;
  getAreaById: (areaId: string) => OfficeArea | undefined;
  getAreasByType: (type: AreaType) => OfficeArea[];
  getAgentByDepartment: (department: Department) => Agent | undefined;
  addWorkspaceItem: (item: WorkspaceItem) => void;
  updateWorkspaceItem: (item: WorkspaceItem) => void;
  deleteWorkspaceItem: (itemId: string) => void;
  getWorkspaceItemsByDepartment: (department: Department) => WorkspaceItem[];
}

const defaultOfficeContext: OfficeContextType = {
  areas: [],
  agents: [],
  onlineUsers: [],
  currentAreaId: 'lobby',
  activeWorkspaceItems: [],
  setCurrentAreaId: () => {},
  getAreaById: () => undefined,
  getAreasByType: () => [],
  getAgentByDepartment: () => undefined,
  addWorkspaceItem: () => {},
  updateWorkspaceItem: () => {},
  deleteWorkspaceItem: () => {},
  getWorkspaceItemsByDepartment: () => [],
};

const OfficeContext = createContext<OfficeContextType>(defaultOfficeContext);

export const useOffice = () => useContext(OfficeContext);

export const OfficeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [areas] = useState<OfficeArea[]>(defaultOfficeAreas);
  const [agents] = useState<Agent[]>(defaultAgents);
  const [onlineUsers] = useState<User[]>([]);
  const [currentAreaId, setCurrentAreaId] = useState<string>('lobby');
  const [workspaceItems, setWorkspaceItems] = useState<WorkspaceItem[]>([]);

  const getAreaById = (areaId: string) => {
    return areas.find(area => area.id === areaId);
  };

  const getAreasByType = (type: AreaType) => {
    return areas.filter(area => area.type === type);
  };

  const getAgentByDepartment = (department: Department) => {
    return agents.find(agent => agent.department === department);
  };

  const addWorkspaceItem = (item: WorkspaceItem) => {
    setWorkspaceItems([...workspaceItems, item]);
  };

  const updateWorkspaceItem = (updatedItem: WorkspaceItem) => {
    setWorkspaceItems(workspaceItems.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
  };

  const deleteWorkspaceItem = (itemId: string) => {
    setWorkspaceItems(workspaceItems.filter(item => item.id !== itemId));
  };

  const getWorkspaceItemsByDepartment = (department: Department) => {
    return workspaceItems.filter(item => item.department === department);
  };

  return (
    <OfficeContext.Provider value={{
      areas,
      agents,
      onlineUsers,
      currentAreaId,
      activeWorkspaceItems: workspaceItems,
      setCurrentAreaId,
      getAreaById,
      getAreasByType,
      getAgentByDepartment,
      addWorkspaceItem,
      updateWorkspaceItem,
      deleteWorkspaceItem,
      getWorkspaceItemsByDepartment,
    }}>
      {children}
    </OfficeContext.Provider>
  );
};