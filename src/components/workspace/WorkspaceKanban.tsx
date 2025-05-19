import React, { useState } from 'react';
import { Plus, MoreHorizontal } from 'lucide-react';
import { WorkspaceItem } from '../../types';

interface WorkspaceKanbanProps {
  items: WorkspaceItem[];
}

interface KanbanColumn {
  id: string;
  title: string;
  items: WorkspaceItem[];
}

const WorkspaceKanban: React.FC<WorkspaceKanbanProps> = ({ items }) => {
  const [columns, setColumns] = useState<KanbanColumn[]>([
    { id: 'todo', title: 'To Do', items: items.slice(0, 1) },
    { id: 'in-progress', title: 'In Progress', items: items.slice(1, 2) },
    { id: 'done', title: 'Done', items: [] }
  ]);
  
  const [draggedItem, setDraggedItem] = useState<WorkspaceItem | null>(null);
  
  const handleDragStart = (e: React.DragEvent, item: WorkspaceItem) => {
    setDraggedItem(item);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    
    if (draggedItem) {
      const updatedColumns = columns.map(col => {
        // Remove the item from its original column
        const filteredItems = col.items.filter(item => item.id !== draggedItem.id);
        
        // If this is the target column, add the item
        if (col.id === columnId) {
          return {
            ...col,
            items: [...filteredItems, draggedItem]
          };
        }
        
        // Otherwise just return the column with filtered items
        return {
          ...col,
          items: filteredItems
        };
      });
      
      setColumns(updatedColumns);
      setDraggedItem(null);
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Tasks & Projects</h2>
        <button className="flex items-center px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition duration-150">
          <Plus className="w-4 h-4 mr-1" />
          Add Task
        </button>
      </div>
      
      <div className="flex-1 p-4 overflow-x-auto">
        <div className="flex h-full gap-4">
          {columns.map(column => (
            <div
              key={column.id}
              className="flex-shrink-0 w-72 flex flex-col bg-gray-50 rounded-lg border border-gray-200"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div className="p-3 border-b border-gray-200 bg-gray-100 rounded-t-lg">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-800">{column.title}</h3>
                  <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
                    {column.items.length}
                  </span>
                </div>
              </div>
              
              <div className="flex-1 p-2 overflow-y-auto">
                {column.items.map(item => (
                  <div
                    key={item.id}
                    className="bg-white p-3 mb-2 rounded-md shadow-sm border border-gray-200 cursor-move"
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{item.content}</p>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-2 border-t border-gray-200">
                <button className="w-full text-sm text-gray-500 py-1 hover:bg-gray-100 rounded flex items-center justify-center">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Card
                </button>
              </div>
            </div>
          ))}
          
          <div className="flex-shrink-0 w-72 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200 border-dashed">
            <button className="flex items-center text-gray-500 py-2 px-4 hover:bg-gray-100 rounded">
              <Plus className="w-5 h-5 mr-2" />
              Add New Column
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceKanban;