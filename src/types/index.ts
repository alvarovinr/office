// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatarId: number;
  department: Department;
  position: Position;
  isOnline: boolean;
}

export interface Position {
  x: number;
  y: number;
  areaId: string;
}

// Office Types
export interface OfficeArea {
  id: string;
  name: string;
  type: AreaType;
  description: string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  color: string;
  icon: string;
}

export enum AreaType {
  Lobby = 'lobby',
  Department = 'department',
  MeetingRoom = 'meeting-room',
  Cafeteria = 'cafeteria',
  CEO = 'ceo-office',
  Innovation = 'innovation'
}

export enum Department {
  None = 'none',
  Marketing = 'marketing',
  Sales = 'sales',
  Operations = 'operations',
  HR = 'hr',
  Finance = 'finance',
  RnD = 'rnd',
  CustomerService = 'customer-service',
  Management = 'management',
  IT = 'it',
  Automation = 'automation'
}

// AI Agent Types
export interface Agent {
  id: string;
  name: string;
  department: Department;
  personality: string;
  avatarUrl: string;
}

// Workspace Types
export interface WorkspaceItem {
  id: string;
  type: 'note' | 'task' | 'project' | 'kpi';
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  department: Department;
  tags: string[];
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isAgentMessage: boolean;
}