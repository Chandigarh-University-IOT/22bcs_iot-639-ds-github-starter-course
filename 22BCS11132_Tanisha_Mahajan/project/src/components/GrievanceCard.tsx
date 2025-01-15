import React from 'react';
import { AlertCircle, Clock, CheckCircle, ArrowUpCircle } from 'lucide-react';
import { Grievance } from '../types';

const statusIcons = {
  pending: <Clock className="w-5 h-5 text-yellow-500" />,
  'in-progress': <AlertCircle className="w-5 h-5 text-blue-500" />,
  resolved: <CheckCircle className="w-5 h-5 text-green-500" />,
  escalated: <ArrowUpCircle className="w-5 h-5 text-red-500" />
};

interface Props {
  grievance: Grievance;
  onStatusChange: (id: string, status: Grievance['status']) => void;
}

export const GrievanceCard: React.FC<Props> = ({ grievance, onStatusChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{grievance.customerName}</h3>
          <p className="text-sm text-gray-600">{grievance.email}</p>
        </div>
        <div className="flex items-center space-x-2">
          {statusIcons[grievance.status]}
          <select
            value={grievance.status}
            onChange={(e) => onStatusChange(grievance.id, e.target.value as Grievance['status'])}
            className="text-sm border rounded-md p-1"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="escalated">Escalated</option>
          </select>
        </div>
      </div>
      
      <div className="mb-4">
        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
          grievance.priority === 'high' ? 'bg-red-100 text-red-800' :
          grievance.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {grievance.priority.toUpperCase()}
        </span>
        <span className="ml-2 text-sm text-gray-600">{grievance.category}</span>
      </div>
      
      <p className="text-gray-700 mb-4">{grievance.description}</p>
      
      {grievance.resolution && (
        <div className="bg-gray-50 p-3 rounded-md mb-4">
          <p className="text-sm text-gray-700"><strong>Resolution:</strong> {grievance.resolution}</p>
        </div>
      )}
      
      <div className="text-xs text-gray-500 flex justify-between">
        <span>Created: {new Date(grievance.createdAt).toLocaleDateString()}</span>
        <span>Last Updated: {new Date(grievance.updatedAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}