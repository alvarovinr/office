import React from 'react';
import { OfficeArea } from '../../types';

interface AreaTooltipProps {
  area: OfficeArea;
  position: { x: number; y: number };
}

const AreaTooltip: React.FC<AreaTooltipProps> = ({ area, position }) => {
  return (
    <div 
      className="absolute z-20 p-4 rounded-xl w-64 backdrop-blur-md"
      style={{
        left: `${position.x}px`,
        top: `${position.y - 10}px`,
        transform: 'translate(-50%, -100%)',
        background: `linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)`,
        border: `2px solid ${area.color}20`,
        boxShadow: `0 8px 32px ${area.color}20`,
      }}
    >
      <div className="flex flex-col">
        <div 
          className="text-base font-bold mb-2" 
          style={{ color: area.color }}
        >
          {area.name}
        </div>
        <div className="text-sm text-gray-600">
          {area.description}
        </div>
      </div>
      <div 
        className="absolute w-3 h-3 transform rotate-45"
        style={{
          left: '50%',
          bottom: '-7px',
          marginLeft: '-6px',
          background: 'rgba(255, 255, 255, 0.95)',
          border: `2px solid ${area.color}20`,
          borderTop: 'none',
          borderLeft: 'none',
        }}
      ></div>
    </div>
  );
};

export default AreaTooltip;