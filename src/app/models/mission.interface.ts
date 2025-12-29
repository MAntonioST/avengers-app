export interface Mission {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'failed' | 'pending';
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  type: 'rescue' | 'investigation' | 'combat' | 'surveillance' | 'infiltration';
  location: string;
  startDate: string;
  endDate?: string;
  assignedHeroes: number[]; // IDs dos heróis
  objectives: string[];
  rewards?: string[];
}