import React from 'react';
import { 
  KanbanSquare, FileText, BarChart4, FolderOpen
} from 'lucide-react';

interface WorkspaceNavProps {
  currentView: string;
  setCurrentView: (view: 'kanban' | 'notes' | 'kpi' | 'files') => void;
}

const WorkspaceNav: React.FC<WorkspaceNavProps> = ({ 
  currentView, 
  setCurrentView 
}) => {
  const navItems = [
    { 
      id: 'kanban', 
      label: 'Tasks & Projects', 
      icon: <KanbanSquare className="w-5 h-5" /> 
    },
    { 
      id: 'notes', 
      label: 'Notes & Docs', 
      icon: <FileText className="w-5 h-5" /> 
    },
    { 
      id: 'kpi', 
      label: 'KPIs & Metrics', 
      icon: <BarChart4 className="w-5 h-5" /> 
    },
    { 
      id: 'files', 
      label: 'Files & Resources', 
      icon: <FolderOpen className="w-5 h-5" /> 
    },
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <nav className="divide-y divide-gray-100">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`w-full flex items-center p-4 transition duration-150 ${
              currentView === item.id 
                ? 'bg-indigo-50 text-indigo-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setCurrentView(item.id as any)}
          >
            <span className="mr-3">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default WorkspaceNav;