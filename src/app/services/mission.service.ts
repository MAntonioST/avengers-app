import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Mission } from '../models/mission.interface';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  private missions: Mission[] = [
    {
      id: 1,
      name: 'Operation: Hydra Infiltration',
      description: 'Infiltrate Hydra base and retrieve stolen technology',
      status: 'completed',
      threatLevel: 'high',
      type: 'infiltration',
      location: 'Eastern Europe',
      startDate: '2024-12-20',
      endDate: '2024-12-22',
      assignedHeroes: [1, 2, 3], // Iron Man, Captain America, Black Widow
      objectives: [
        'Locate stolen arc reactor technology',
        'Neutralize Hydra operatives',
        'Extract without civilian casualties'
      ],
      rewards: ['Advanced technology recovered', 'Hydra cell dismantled']
    },
    {
      id: 2,
      name: 'Cosmic Threat Investigation',
      description: 'Investigate unusual energy signatures from space',
      status: 'active',
      threatLevel: 'critical',
      type: 'investigation',
      location: 'New York City',
      startDate: '2024-12-25',
      assignedHeroes: [4, 5, 6], // Thor, Hulk, Doctor Strange
      objectives: [
        'Analyze cosmic energy readings',
        'Identify source of threat',
        'Prepare defensive measures'
      ]
    },
    {
      id: 3,
      name: 'Civilian Rescue Operation',
      description: 'Rescue civilians trapped in collapsed building',
      status: 'completed',
      threatLevel: 'medium',
      type: 'rescue',
      location: 'Los Angeles',
      startDate: '2024-12-18',
      endDate: '2024-12-18',
      assignedHeroes: [7, 8], // Spider-Man, Captain Marvel
      objectives: [
        'Evacuate all civilians safely',
        'Stabilize building structure',
        'Provide medical assistance'
      ],
      rewards: ['47 civilians rescued', 'Zero casualties']
    },
    {
      id: 4,
      name: 'Surveillance: Criminal Network',
      description: 'Monitor suspected criminal organization activities',
      status: 'active',
      threatLevel: 'low',
      type: 'surveillance',
      location: 'Chicago',
      startDate: '2024-12-23',
      assignedHeroes: [3, 9], // Black Widow, Hawkeye
      objectives: [
        'Gather intelligence on criminal activities',
        'Identify key members',
        'Document evidence'
      ]
    },
    {
      id: 5,
      name: 'Combat: Alien Invasion',
      description: 'Repel alien forces attacking major cities',
      status: 'failed',
      threatLevel: 'critical',
      type: 'combat',
      location: 'Multiple Cities',
      startDate: '2024-12-15',
      endDate: '2024-12-16',
      assignedHeroes: [1, 2, 4, 5, 6, 7, 8], // Full team deployment
      objectives: [
        'Eliminate alien threat',
        'Protect civilian populations',
        'Minimize infrastructure damage'
      ]
    },
    {
      id: 6,
      name: 'Investigation: Missing Scientists',
      description: 'Locate missing quantum physics researchers',
      status: 'pending',
      threatLevel: 'medium',
      type: 'investigation',
      location: 'Geneva, Switzerland',
      startDate: '2024-12-28',
      assignedHeroes: [1, 10], // Iron Man, Ant-Man
      objectives: [
        'Locate missing researchers',
        'Investigate disappearance circumstances',
        'Ensure their safety'
      ]
    },
    {
      id: 7,
      name: 'Rescue: Hostage Situation',
      description: 'Free hostages from terrorist organization',
      status: 'active',
      threatLevel: 'high',
      type: 'rescue',
      location: 'Washington D.C.',
      startDate: '2024-12-27',
      assignedHeroes: [2, 3, 9], // Captain America, Black Widow, Hawkeye
      objectives: [
        'Neutralize terrorist threat',
        'Rescue all hostages unharmed',
        'Capture terrorist leaders'
      ]
    },
    {
      id: 8,
      name: 'Combat: Robot Army',
      description: 'Stop rogue AI controlling military robots',
      status: 'completed',
      threatLevel: 'high',
      type: 'combat',
      location: 'Silicon Valley',
      startDate: '2024-12-10',
      endDate: '2024-12-12',
      assignedHeroes: [1, 5, 10], // Iron Man, Hulk, Ant-Man
      objectives: [
        'Disable rogue AI system',
        'Stop robot army',
        'Prevent technology theft'
      ],
      rewards: ['AI threat neutralized', 'Technology secured']
    }
  ];

  constructor() { }

  getMissions(): Observable<Mission[]> {
    return of(this.missions);
  }

  getMissionById(id: number): Observable<Mission | undefined> {
    const mission = this.missions.find(m => m.id === id);
    return of(mission);
  }

  getActiveMissions(): Observable<Mission[]> {
    const activeMissions = this.missions.filter(m => m.status === 'active');
    return of(activeMissions);
  }

  getMissionsByStatus(status: Mission['status']): Observable<Mission[]> {
    const filteredMissions = this.missions.filter(m => m.status === status);
    return of(filteredMissions);
  }

  getMissionsByThreatLevel(threatLevel: Mission['threatLevel']): Observable<Mission[]> {
    const filteredMissions = this.missions.filter(m => m.threatLevel === threatLevel);
    return of(filteredMissions);
  }

  getMissionsByHero(heroId: number): Observable<Mission[]> {
    const heroMissions = this.missions.filter(m => m.assignedHeroes.includes(heroId));
    return of(heroMissions);
  }

  addMission(mission: Omit<Mission, 'id'>): Observable<Mission> {
    const newMission: Mission = {
      ...mission,
      id: Math.max(...this.missions.map(m => m.id)) + 1
    };
    this.missions.push(newMission);
    return of(newMission);
  }

  updateMission(id: number, updates: Partial<Mission>): Observable<Mission | null> {
    const index = this.missions.findIndex(m => m.id === id);
    if (index !== -1) {
      this.missions[index] = { ...this.missions[index], ...updates };
      return of(this.missions[index]);
    }
    return of(null);
  }

  deleteMission(id: number): Observable<boolean> {
    const index = this.missions.findIndex(m => m.id === id);
    if (index !== -1) {
      this.missions.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  // Statistics methods
  getMissionStats(): Observable<{
    total: number;
    active: number;
    completed: number;
    failed: number;
    pending: number;
    byThreatLevel: { [key: string]: number };
    byType: { [key: string]: number };
    successRate: number;
  }> {
    const stats = {
      total: this.missions.length,
      active: this.missions.filter(m => m.status === 'active').length,
      completed: this.missions.filter(m => m.status === 'completed').length,
      failed: this.missions.filter(m => m.status === 'failed').length,
      pending: this.missions.filter(m => m.status === 'pending').length,
      byThreatLevel: {
        low: this.missions.filter(m => m.threatLevel === 'low').length,
        medium: this.missions.filter(m => m.threatLevel === 'medium').length,
        high: this.missions.filter(m => m.threatLevel === 'high').length,
        critical: this.missions.filter(m => m.threatLevel === 'critical').length
      },
      byType: {
        rescue: this.missions.filter(m => m.type === 'rescue').length,
        investigation: this.missions.filter(m => m.type === 'investigation').length,
        combat: this.missions.filter(m => m.type === 'combat').length,
        surveillance: this.missions.filter(m => m.type === 'surveillance').length,
        infiltration: this.missions.filter(m => m.type === 'infiltration').length
      },
      successRate: 0
    };

    const completedMissions = stats.completed;
    const totalFinishedMissions = stats.completed + stats.failed;
    stats.successRate = totalFinishedMissions > 0 ? Math.round((completedMissions / totalFinishedMissions) * 100) : 0;

    return of(stats);
  }
}