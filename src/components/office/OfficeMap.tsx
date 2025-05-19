import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOffice } from '../../contexts/OfficeContext';
import { useUser } from '../../contexts/UserContext';
import { OfficeArea, Position } from '../../types';
import AreaTooltip from './AreaTooltip';
import UserAvatar from '../shared/UserAvatar';
import * as LucideIcons from 'lucide-react';

const OfficeMap: React.FC = () => {
  const { areas, setCurrentAreaId, onlineUsers } = useOffice();
  const { currentUser, updateUserPosition } = useUser();
  const [hoveredArea, setHoveredArea] = useState<OfficeArea | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const mapWidth = 800;
  const mapHeight = 600;
  
  const handleAreaClick = (area: OfficeArea) => {
    if (currentUser) {
      const newPosition: Position = {
        x: area.position.x + area.position.width / 2,
        y: area.position.y + area.position.height / 2,
        areaId: area.id
      };
      
      updateUserPosition(newPosition);
      setCurrentAreaId(area.id);
      
      if (area.type === 'department') {
        navigate('/office/workspace');
      } else if (area.type === 'ceo-office') {
        navigate('/office/workspace');
      }
    }
  };
  
  const handleAreaHover = (area: OfficeArea, event: React.MouseEvent) => {
    setHoveredArea(area);
    
    if (mapContainerRef.current) {
      const rect = mapContainerRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top - 10
      });
    }
  };

  const getIconComponent = (iconName: string) => {
    return (LucideIcons as any)[iconName] || LucideIcons.Building2;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Mapa de la Oficina</h2>
        <p className="text-gray-600">
          Explora nuestra oficina virtual haciendo clic en las diferentes áreas. Cada departamento tiene su 
          propio espacio de trabajo y asistente de IA.
        </p>
      </div>
      
      <div className="flex-1 bg-white rounded-xl shadow-lg p-6 overflow-hidden">
        <div 
          ref={mapContainerRef}
          className="relative w-full h-full overflow-auto"
          style={{ 
            minHeight: '400px',
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e1f2fe 100%)',
            borderRadius: '12px',
            border: '1px solid rgba(148, 163, 184, 0.2)'
          }}
        >
          <div 
            className="relative" 
            style={{ width: `${mapWidth}px`, height: `${mapHeight}px` }}
          >
            <div className="absolute inset-0" 
              style={{ 
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.15) 1px, transparent 0)',
                backgroundSize: '20px 20px',
                opacity: 0.5
              }} 
            />
            
            {areas.map((area) => {
              const IconComponent = getIconComponent(area.icon);
              
              return (
                <div
                  key={area.id}
                  className="absolute rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                  style={{
                    left: `${area.position.x}px`,
                    top: `${area.position.y}px`,
                    width: `${area.position.width}px`,
                    height: `${area.position.height}px`,
                    background: `linear-gradient(135deg, ${area.color}15 0%, ${area.color}25 100%)`,
                    border: `2px solid ${area.color}`,
                    boxShadow: `0 4px 20px ${area.color}20`,
                  }}
                  onClick={() => handleAreaClick(area)}
                  onMouseEnter={(e) => handleAreaHover(area, e)}
                  onMouseLeave={() => setHoveredArea(null)}
                >
                  <div className="flex items-center justify-center h-full p-4">
                    <div className="text-center">
                      <div className="flex justify-center mb-2">
                        <div 
                          className="p-3 rounded-lg"
                          style={{ 
                            background: `${area.color}30`,
                            backdropFilter: 'blur(8px)'
                          }}
                        >
                          <IconComponent className="h-6 w-6" style={{ color: area.color }} />
                        </div>
                      </div>
                      <span 
                        className="text-sm font-medium"
                        style={{ color: area.color }}
                      >
                        {area.name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {currentUser && (
              <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out z-10"
                style={{
                  left: `${currentUser.position.x}px`,
                  top: `${currentUser.position.y}px`,
                }}
              >
                <UserAvatar user={currentUser} size="sm" />
              </div>
            )}
            
            {onlineUsers.filter(user => user.id !== currentUser?.id).map(user => (
              <div
                key={user.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${user.position.x}px`,
                  top: `${user.position.y}px`,
                }}
              >
                <UserAvatar user={user} size="xs" />
              </div>
            ))}
            
            {hoveredArea && (
              <AreaTooltip 
                area={hoveredArea}
                position={tooltipPosition}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeMap;