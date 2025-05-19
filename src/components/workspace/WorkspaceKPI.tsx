import React from 'react';
import { BarChart, PieChart, TrendingUp, TrendingDown } from 'lucide-react';
import { WorkspaceItem } from '../../types';

interface WorkspaceKPIProps {
  items: WorkspaceItem[];
}

const WorkspaceKPI: React.FC<WorkspaceKPIProps> = ({ items }) => {
  // Mock KPI data
  const kpiData = [
    {
      id: 'kpi-1',
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+0.5%',
      trend: 'up',
      icon: <BarChart className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      id: 'kpi-2',
      title: 'Average Order Value',
      value: '$67.40',
      change: '+$2.35',
      trend: 'up',
      icon: <PieChart className="w-6 h-6" />,
      color: 'bg-indigo-500'
    },
    {
      id: 'kpi-3',
      title: 'Customer Acquisition Cost',
      value: '$24.50',
      change: '-$1.20',
      trend: 'down',
      icon: <BarChart className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      id: 'kpi-4',
      title: 'Monthly Active Users',
      value: '24,381',
      change: '+1,293',
      trend: 'up',
      icon: <PieChart className="w-6 h-6" />,
      color: 'bg-amber-500'
    },
  ];
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Department KPIs & Metrics</h2>
        <div className="text-sm text-gray-500">Last updated: Today, 10:30 AM</div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
          {kpiData.map(kpi => (
            <div 
              key={kpi.id} 
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-start">
                <div className={`${kpi.color} text-white p-3 rounded-lg mr-4`}>
                  {kpi.icon}
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm mb-1">{kpi.title}</h3>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900 mr-2">{kpi.value}</span>
                    <div className={`flex items-center text-sm ${
                      kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {kpi.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {kpi.change}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <h3 className="font-medium text-gray-900 mb-4">Conversion Funnel</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Visitors</span>
                  <span className="font-medium">52,420</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Product Views</span>
                  <span className="font-medium">24,618</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-[47%]"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Add to Cart</span>
                  <span className="font-medium">10,492</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-[20%]"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Completed Purchase</span>
                  <span className="font-medium">1,677</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-[3.2%]"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <h3 className="font-medium text-gray-900 mb-4">Revenue by Channel</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Organic Search</span>
                  <span className="font-medium">$42,500</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-[42.5%]"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Direct Traffic</span>
                  <span className="font-medium">$31,200</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-500 h-2 rounded-full w-[31.2%]"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Paid Ads</span>
                  <span className="font-medium">$18,300</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full w-[18.3%]"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Social Media</span>
                  <span className="font-medium">$8,000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-pink-500 h-2 rounded-full w-[8%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceKPI;