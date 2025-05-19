import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { useOffice } from '../../contexts/OfficeContext';
import { Message } from '../../types';
import UserAvatar from '../shared/UserAvatar';

const AgentChat: React.FC = () => {
  const { currentUser } = useUser();
  const { currentAreaId, getAreaById, getAgentByDepartment } = useOffice();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const currentArea = getAreaById(currentAreaId);
  const currentDepartment = currentUser?.department || 'none';
  const agent = getAgentByDepartment(currentDepartment);
  
  // Initial welcome message from agent
  useEffect(() => {
    if (agent && messages.length === 0) {
      const welcomeMessage: Message = {
        id: `msg-${Date.now()}`,
        senderId: agent.id,
        content: `Hello ${currentUser?.name || 'there'}! I'm ${agent.name}, the AI assistant for the ${currentDepartment} department. How can I help you today?`,
        timestamp: new Date().toISOString(),
        isAgentMessage: true
      };
      
      setMessages([welcomeMessage]);
    }
  }, [agent, currentUser, currentDepartment, messages.length]);
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!input.trim() || !currentUser || !agent) return;
    
    // Add user message
    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      senderId: currentUser.id,
      content: input,
      timestamp: new Date().toISOString(),
      isAgentMessage: false
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    
    // Simulate agent response
    setTimeout(() => {
      const agentResponse: Message = {
        id: `msg-${Date.now()}-agent`,
        senderId: agent.id,
        content: generateAgentResponse(input, agent.personality),
        timestamp: new Date().toISOString(),
        isAgentMessage: true
      };
      
      setMessages(prev => [...prev, agentResponse]);
    }, 1000);
  };
  
  // Simple agent response generator (in a real app this would be a call to an AI service)
  const generateAgentResponse = (userInput: string, personality: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('hello') || input.includes('hi')) {
      return `Hello there! How can I assist you with ${currentDepartment} matters today?`;
    }
    
    if (input.includes('help') || input.includes('assistance')) {
      return `I'd be happy to help! As the ${currentDepartment} assistant, I can provide information, answer questions, and help coordinate tasks. What specifically do you need assistance with?`;
    }
    
    if (input.includes('task') || input.includes('project')) {
      return `For task and project management, you can use the Kanban board in your workspace. Would you like me to help you create a new task or project?`;
    }
    
    if (input.includes('report') || input.includes('metric') || input.includes('kpi')) {
      return `You can find detailed metrics and KPIs in the department dashboard. The latest reports show good progress toward our quarterly goals. Would you like me to highlight any specific metrics?`;
    }
    
    return `I understand you're asking about "${userInput}". Let me analyze this request and come back with relevant information for the ${currentDepartment} department. Is there anything specific you'd like to know?`;
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex items-center">
          {agent && (
            <img 
              src={agent.avatarUrl} 
              alt={agent.name}
              className="w-10 h-10 rounded-full mr-3 border-2 border-white shadow-sm"
            />
          )}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {agent ? agent.name : 'Department Assistant'}
            </h2>
            <p className="text-gray-600 text-sm">
              {agent ? `${currentDepartment} Department AI Assistant` : 'Select a department to chat with an agent'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 bg-white rounded-lg shadow-md flex flex-col overflow-hidden">
        {/* Chat messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.isAgentMessage ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex max-w-xs md:max-w-md ${message.isAgentMessage ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex-shrink-0 ${message.isAgentMessage ? 'mr-3' : 'ml-3'}`}>
                    {message.isAgentMessage ? (
                      agent && (
                        <img 
                          src={agent.avatarUrl} 
                          alt={agent.name}
                          className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                        />
                      )
                    ) : (
                      <UserAvatar user={currentUser} size="sm" />
                    )}
                  </div>
                  
                  <div>
                    <div 
                      className={`p-3 rounded-lg ${
                        message.isAgentMessage 
                          ? 'bg-white border border-gray-200 text-gray-800' 
                          : 'bg-indigo-600 text-white'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Input area */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 mx-3 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim()}
              className={`p-2 rounded-full ${
                input.trim() 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentChat;