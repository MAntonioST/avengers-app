import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HeroService } from '../../services/hero.services';
import { MissionService } from '../../services/mission.service';
import { Hero } from '../../models/hero.interface';
import { Mission } from '../../models/mission.interface';

interface Activity {
  id: number;
  title: string;
  description: string;
  time: string;
  type: 'hero' | 'mission' | 'system' | 'alert';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Stats
  totalHeroes: number = 0;
  totalMissions: number = 0;
  threatLevel: number = 3;
  successRate: number = 87;

  // Data
  topHeroes: Hero[] = [];
  recentMissions: Mission[] = [];
  recentActivities: Activity[] = [];

  constructor(
    private heroService: HeroService,
    private missionService: MissionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadDashboardData();
    this.generateRecentActivities();
  }

  loadDashboardData() {
    // Load heroes
    this.heroService.getHeroes().subscribe(heroes => {
      this.totalHeroes = heroes.length;
      this.topHeroes = heroes
        .filter(hero => hero.status === 'active')
        .sort((a, b) => this.calculateOverallPower(b) - this.calculateOverallPower(a))
        .slice(0, 5);
    });

    // Load missions
    this.missionService.getMissions().subscribe(missions => {
      this.totalMissions = missions.filter(m => m.status === 'active').length;
      this.recentMissions = missions
        .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
        .slice(0, 5);
    });
  }

  generateRecentActivities() {
    this.recentActivities = [
      {
        id: 1,
        title: 'New Hero Registered',
        description: 'Spider-Man has joined the Avengers roster',
        time: '2 hours ago',
        type: 'hero'
      },
      {
        id: 2,
        title: 'Mission Completed',
        description: 'Operation: Hydra Infiltration completed successfully',
        time: '4 hours ago',
        type: 'mission'
      },
      {
        id: 3,
        title: 'System Update',
        description: 'Security protocols updated to version 2.1.4',
        time: '6 hours ago',
        type: 'system'
      },
      {
        id: 4,
        title: 'Threat Alert',
        description: 'High energy signature detected in New York',
        time: '8 hours ago',
        type: 'alert'
      },
      {
        id: 5,
        title: 'Hero Status Update',
        description: 'Iron Man returned from mission and is now available',
        time: '12 hours ago',
        type: 'hero'
      },
      {
        id: 6,
        title: 'Mission Briefing',
        description: 'New mission assigned: Cosmic Threat Investigation',
        time: '1 day ago',
        type: 'mission'
      }
    ];
  }

  // Navigation methods
  navigateToHeroes() {
    this.router.navigate(['/heroes']);
  }

  navigateToMissions() {
    this.router.navigate(['/missions']);
  }

  viewHeroDetails(heroId: number) {
    this.router.navigate(['/heroes', heroId]);
  }

  viewMissionDetails(missionId: number) {
    this.router.navigate(['/missions', missionId]);
  }

  // Utility methods
  calculateOverallPower(hero: Hero): number {
    const stats = hero.stats;
    return Math.round((stats.strength + stats.intelligence + stats.speed + 
                      stats.durability + stats.energy + stats.fighting) / 6);
  }

  getStatusIcon(status: string): string {
    switch(status) {
      case 'active': return 'check_circle';
      case 'inactive': return 'pause_circle';
      case 'retired': return 'cancel';
      default: return 'help';
    }
  }

  getMissionIcon(type: string): string {
    switch(type) {
      case 'rescue': return 'medical_services';
      case 'investigation': return 'search';
      case 'combat': return 'gps_fixed';
      case 'surveillance': return 'visibility';
      case 'infiltration': return 'security';
      default: return 'assignment';
    }
  }

  getThreatClass(): string {
    if (this.threatLevel <= 2) return 'threat-low';
    if (this.threatLevel <= 4) return 'threat-medium';
    if (this.threatLevel <= 6) return 'threat-high';
    return 'threat-critical';
  }

  // Stats calculation methods
  getActiveHeroesCount(): number {
    return this.topHeroes.filter(hero => hero.status === 'active').length;
  }

  getCompletedMissionsCount(): number {
    return this.recentMissions.filter(mission => mission.status === 'completed').length;
  }

  getCurrentThreatLevel(): string {
    const levels = ['Minimal', 'Low', 'Moderate', 'High', 'Severe', 'Critical', 'Extreme'];
    return levels[this.threatLevel - 1] || 'Unknown';
  }

  // System metrics (simulated)
  getSystemHealth(): { [key: string]: number } {
    return {
      serverLoad: 65,
      database: 42,
      network: 88,
      security: 95
    };
  }

  // Real-time updates simulation
  simulateRealTimeUpdates() {
    setInterval(() => {
      // Simulate small changes in stats
      this.successRate = Math.max(80, Math.min(100, this.successRate + (Math.random() - 0.5) * 2));
      this.threatLevel = Math.max(1, Math.min(7, this.threatLevel + (Math.random() - 0.5)));
    }, 30000); // Update every 30 seconds
  }

  // Emergency actions
  triggerEmergencyProtocol() {
    // This would typically call an API to trigger emergency protocols
    console.log('Emergency protocol activated!');
    // You could show a dialog, send notifications, etc.
  }

  // Quick action methods
  addNewHero() {
    this.navigateToHeroes();
    // Could open a dialog for adding a new hero
  }

  createNewMission() {
    this.navigateToMissions();
    // Could open a dialog for creating a new mission
  }

  openSettings() {
    // Navigate to settings page or open settings dialog
    console.log('Opening settings...');
  }

  // Data refresh
  refreshDashboard() {
    this.loadDashboardData();
    this.generateRecentActivities();
    console.log('Dashboard data refreshed');
  }

  // Export data functionality
  exportDashboardData() {
    const dashboardData = {
      stats: {
        totalHeroes: this.totalHeroes,
        totalMissions: this.totalMissions,
        threatLevel: this.threatLevel,
        successRate: this.successRate
      },
      topHeroes: this.topHeroes,
      recentMissions: this.recentMissions,
      recentActivities: this.recentActivities,
      timestamp: new Date().toISOString()
    };

    const dataStr = JSON.stringify(dashboardData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `avengers-dashboard-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  }

  // Performance monitoring
  trackUserInteraction(action: string, target: string) {
    console.log(`User interaction: ${action} on ${target}`);
    // This could send analytics data to a service
  }
}