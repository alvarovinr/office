import React from 'react';
import { Plus, Search, ListFilter, MoreHorizontal } from 'lucide-react';
import { WorkspaceItem } from '../../types';

interface WorkspaceNotesProps {
  items: WorkspaceItem[];
}

const WorkspaceNotes: React.FC<WorkspaceNotesProps> = ({ items }) => {
  // Add some mock notes if there are none
  const mockNotes: WorkspaceItem[] = [
    {
      id: 'note-1',
      type: 'note',
      title: 'Department Strategy',
      content: 'Key initiatives for this quarter include expanding our social media presence and launching the new product line.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'user-123',
      department: items[0]?.department || 'none',
      tags: ['strategy', 'planning']
    },
    {
      id: 'note-2',
      type: 'note',
      title: 'Weekly Team Meeting Notes',
      content: 'Discussed progress on Project Alpha, resource allocation, and upcoming deadlines.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'user-123',
      department: items[0]?.department || 'none',
      tags: ['meeting', 'team']
    }
  ];
  
  const allNotes = items.length > 0 ? items : mockNotes;
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Notes & Documents</h2>
        <button className="flex items-center px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition duration-150">
          <Plus className="w-4 h-4 mr-1" />
          New Note
        </button>
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search notes..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <ListFilter className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid gap-4 md:grid-cols-2">
            {allNotes.map(note => (
              <div 
                key={note.id} 
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-medium text-gray-900">{note.title}</h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {note.content}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-1">
                      {note.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceNotes;