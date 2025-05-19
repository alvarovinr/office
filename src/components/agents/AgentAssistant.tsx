import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { Agent } from '../../types';

interface AgentAssistantProps {
  agent: Agent;
}

const AgentAssistant: React.FC<AgentAssistantProps> = ({ agent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [answer, setAnswer] = useState('');
  
  const handleAskQuestion = () => {
    if (!question.trim()) return;
    
    setIsTyping(true);
    setAnswer('');
    
    // Simulate typing effect
    let displayText = '';
    const response = generateResponse(question, agent);
    const words = response.split(' ');
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < words.length) {
        displayText += words[i] + ' ';
        setAnswer(displayText);
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 50);
    
    setQuestion('');
  };
  
  // Simple response generator
  const generateResponse = (question: string, agent: Agent): string => {
    const lowercaseQ = question.toLowerCase();
    
    if (lowercaseQ.includes('help') || lowercaseQ.includes('what can you do')) {
      return `I can help you with various ${agent.department} tasks, answer questions about your department, and provide guidance on best practices. Just let me know what you need!`;
    }
    
    if (lowercaseQ.includes('report') || lowercaseQ.includes('metric') || lowercaseQ.includes('kpi')) {
      return `The latest ${agent.department} metrics show positive trends. You can check the KPI dashboard for detailed information. Would you like me to highlight any specific area?`;
    }
    
    if (lowercaseQ.includes('meeting') || lowercaseQ.includes('schedule')) {
      return `I can help you schedule a meeting with the ${agent.department} team. Just let me know the preferred date, time, and participants, and I'll set it up for you.`;
    }
    
    return `Thanks for your question about "${question}". As your ${agent.department} department assistant, I'm analyzing relevant information and will provide guidance shortly. Is there anything specific you'd like to know?`;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div 
        className="flex items-center p-3 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img 
          src={agent.avatarUrl} 
          alt={agent.name}
          className="w-8 h-8 rounded-full mr-3 border-2 border-white shadow-sm"
        />
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{agent.name}</h3>
          <p className="text-xs text-gray-500">{agent.department} Assistant</p>
        </div>
        <div className="text-gray-400">
          {isOpen ? <X size={18} /> : <MessageSquare size={18} />}
        </div>
      </div>
      
      {isOpen && (
        <div className="p-3 border-t border-gray-100">
          {answer && (
            <div className="mb-3 p-3 bg-gray-50 rounded-md text-sm text-gray-700">
              {answer}
              {isTyping && <span className="inline-block animate-pulse">|</span>}
            </div>
          )}
          
          <div className="flex items-center">
            <input
              type="text"
              placeholder={`Ask ${agent.name} a question...`}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
              className="flex-1 p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              disabled={isTyping}
            />
            <button
              onClick={handleAskQuestion}
              disabled={!question.trim() || isTyping}
              className={`ml-2 p-2 rounded-md ${
                question.trim() && !isTyping
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <MessageSquare size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentAssistant;