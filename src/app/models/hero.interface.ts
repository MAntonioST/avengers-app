export interface Hero {
  id: number;
  name: string;
  realName: string;
  avatar: string;
  description: string;
  affiliation: string; // ✅ Adicionado
  status: 'active' | 'inactive' | 'retired';
  powers: string[];
  equipment?: string[]; // ✅ Adicionado como opcional
  stats: {
    strength: number;
    intelligence: number;
    speed: number;
    durability: number;
    energy: number;
    fighting: number;
  };
}

export interface Mission {
  id: number;
  title: string;
  description: string;
  location: string;
  date: Date;
  status: 'active' | 'completed' | 'failed';
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  assignedHeroes?: number[]; // ✅ Adicionado como opcional
}