import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { GrievanceCard } from './components/GrievanceCard';
import { GrievanceForm } from './components/GrievanceForm';
import { Grievance } from './types';

function App() {
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [activeTab, setActiveTab] = useState<'list' | 'new'>('list');

  const handleNewGrievance = (grievanceData: Omit<Grievance, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    const newGrievance: Grievance = {
      ...grievanceData,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setGrievances(prev => [newGrievance, ...prev]);
    setActiveTab('list');
  };

  const handleStatusChange = (id: string, status: Grievance['status']) => {
    setGrievances(prev =>
      prev.map(g =>
        g.id === id ? { ...g, status, updatedAt: new Date() } : g
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MessageSquare className="w-8 h-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">Customer Grievance Tracker</h1>
            </div>
            <nav className="flex space-x-4">
              <button
                onClick={() => setActiveTab('list')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'list'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                View Grievances
              </button>
              <button
                onClick={() => setActiveTab('new')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'new'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                New Grievance
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'list' ? (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">All Grievances</h2>
              <p className="text-gray-600">Track and manage customer grievances</p>
            </div>
            
            {grievances.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No grievances submitted yet.</p>
                <button
                  onClick={() => setActiveTab('new')}
                  className="mt-4 text-blue-600 hover:text-blue-700"
                >
                  Submit a new grievance
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {grievances.map(grievance => (
                  <GrievanceCard
                    key={grievance.id}
                    grievance={grievance}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <GrievanceForm onSubmit={handleNewGrievance} />
        )}
      </main>
    </div>
  );
}

export default App;