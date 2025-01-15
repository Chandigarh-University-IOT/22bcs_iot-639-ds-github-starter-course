export interface Grievance {
  id: string;
  customerName: string;
  email: string;
  category: string;
  description: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'escalated';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  resolution?: string;
  feedback?: string;
}

export interface User {
  id: string;
  name: string;
  role: 'customer' | 'support' | 'manager';
}