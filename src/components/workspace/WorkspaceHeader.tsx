import React from 'react';
import { Department } from '../../types';

interface WorkspaceHeaderProps {
  departmentName: Department;
  agentName?: string;
}

const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({ departmentName, agentName }) => {
  const getDepartmentTitle = () => {
    if (departmentName === Department.None) {
      return 'Welcome to Your Workspace';
    }
    return `${departmentName} Department Workspace`;
  };
  
  const getDepartmentDescription = () => {
    if (departmentName === Department.None) {
      return 'Select a department to view department-specific tools and resources.';
    }
    
    const descriptions: Record<Department, string> = {
      [Department.None]: '',
      [Department.Marketing]: 'Create and manage marketing campaigns, content, and strategy.',
      [Department.Sales]: 'Track leads, manage customer accounts, and report on sales activities.',
      [Department.Operations]: 'Oversee day-to-day operations and process optimization.',
      [Department.HR]: 'Manage recruitment, employee development, and company culture.',
      [Department.Finance]: 'Track finances, budgets, and financial reporting.',
      [Department.RnD]: 'Develop new products and innovate on existing offerings.',
      [Department.CustomerService]: 'Support customers and manage their inquiries and feedback.',
      [Department.Management]: 'Strategic planning and company-wide decision making.',
      [Department.IT]: 'Maintain technology infrastructure and support.',
      [Department.Automation]: 'Design and implement automation solutions for the business.',
    };
    
    return descriptions[departmentName];
  };
  
  const getAgentMessage = () => {
    if (!agentName) return '';
    
    if (departmentName === Department.None) {
      return `Ask Alex for help navigating the virtual office.`;
    }
    
    return `${agentName} is your ${departmentName} department AI assistant.`;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        {getDepartmentTitle()}
      </h1>
      <p className="text-gray-600 mb-2">
        {getDepartmentDescription()}
      </p>
      {agentName && (
        <p className="text-sm text-gray-500">
          {getAgentMessage()}
        </p>
      )}
    </div>
  );
};

export default WorkspaceHeader;