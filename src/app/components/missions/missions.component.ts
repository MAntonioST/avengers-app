import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MissionService } from '../../services/mission.service';
import { HeroService } from '../../services/hero.services';
import { Mission } from '../../models/mission.interface';
import { Hero } from '../../models/hero.interface';

@Component({
  selector: 'app-missions',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule
  ],
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {
  missions: Mission[] = [];
  filteredMissions: Mission[] = [];
  heroes: Hero[] = [];
  selectedFilter: string = 'all';
  selectedThreatFilter: string = 'all';

  constructor(
    private missionService: MissionService,
    private heroService: HeroService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadMissions();
    this.loadHeroes();
  }

  loadMissions() {
    this.missionService.getMissions().subscribe(missions => {
      this.missions = missions;
      this.applyFilters();
    });
  }

  loadHeroes() {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
    });
  }

  // Filter methods
  filterMissions(filter: string) {
    this.selectedFilter = filter;
    this.applyFilters();
  }

  filterByThreat(threatLevel: string) {
    this.selectedThreatFilter = threatLevel;
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.missions];

    // Apply status filter
    if (this.selectedFilter !== 'all') {
      filtered = filtered.filter(mission => mission.status === this.selectedFilter);
    }

    // Apply threat level filter
    if (this.selectedThreatFilter !== 'all') {
      filtered = filtered.filter(mission => mission.threatLevel === this.selectedThreatFilter);
    }

    this.filteredMissions = filtered;
  }

  // Navigation
  viewMissionDetails(missionId: number) {
    this.router.navigate(['/missions', missionId]);
  }

  // Icon methods
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

  getThreatIcon(threatLevel: string): string {
    switch(threatLevel) {
      case 'low': return 'sentiment_satisfied';
      case 'medium': return 'sentiment_neutral';
      case 'high': return 'sentiment_dissatisfied';
      case 'critical': return 'dangerous';
      default: return 'help';
    }
  }

  getStatusIcon(status: string): string {
    switch(status) {
      case 'active': return 'play_arrow';
      case 'completed': return 'check_circle';
      case 'failed': return 'error';
      case 'pending': return 'schedule';
      default: return 'help';
    }
  }

  // Hero methods
  getHeroName(heroId: number): string {
    const hero = this.heroes.find(h => h.id === heroId);
    return hero ? hero.name : 'Unknown Hero';
  }

  getHeroAvatar(heroId: number): string {
    const hero = this.heroes.find(h => h.id === heroId);
    return hero ? hero.avatar : '❓';
  }

  // Statistics methods
  getActiveMissions(): number {
    return this.missions.filter(mission => mission.status === 'active').length;
  }

  getCompletedMissions(): number {
    return this.missions.filter(mission => mission.status === 'completed').length;
  }

  getFailedMissions(): number {
    return this.missions.filter(mission => mission.status === 'failed').length;
  }

  getPendingMissions(): number {
    return this.missions.filter(mission => mission.status === 'pending').length;
  }

  getSuccessRate(): number {
    const completed = this.getCompletedMissions();
    const failed = this.getFailedMissions();
    const total = completed + failed;
    
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  }

  getAverageTime(): string {
    const completedMissions = this.missions.filter(m => m.status === 'completed' && m.endDate);
    
    if (completedMissions.length === 0) return '0 days';

    let totalDays = 0;
    completedMissions.forEach(mission => {
      if (mission.endDate) {
        const start = new Date(mission.startDate);
        const end = new Date(mission.endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        totalDays += diffDays;
      }
    });

    const avgDays = Math.round(totalDays / completedMissions.length);
    return `${avgDays} days`;
  }

  getTotalHeroesDeployed(): number {
    const heroIds = new Set<number>();
    this.missions.forEach(mission => {
      mission.assignedHeroes.forEach(heroId => heroIds.add(heroId));
    });
    return heroIds.size;
  }

  // Mission progress calculation (simulated)
  getMissionProgress(mission: Mission): number {
    if (mission.status === 'completed') return 100;
    if (mission.status === 'failed') return 0;
    if (mission.status === 'pending') return 0;
    
    // Simulate progress based on mission start date and current date
    const startDate = new Date(mission.startDate);
    const currentDate = new Date();
    const daysSinceStart = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Simulate different progress rates based on mission type
    let progressRate = 10; // Default 10% per day
    switch(mission.type) {
      case 'investigation': progressRate = 15; break;
      case 'surveillance': progressRate = 8; break;
      case 'combat': progressRate = 25; break;
      case 'rescue': progressRate = 30; break;
      case 'infiltration': progressRate = 12; break;
    }
    
    const progress = Math.min(95, daysSinceStart * progressRate); // Cap at 95% for active missions
    return Math.max(5, progress); // Minimum 5% for active missions
  }

  // Date formatting
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Utility methods
  trackByMission(index: number, mission: Mission): number {
    return mission.id;
  }

  // Mission management actions
  createNewMission() {
    // Navigate to mission creation page or open dialog
    console.log('Creating new mission...');
  }

  editMission(missionId: number) {
    console.log(`Editing mission ${missionId}...`);
  }

  deleteMission(missionId: number) {
    console.log(`Deleting mission ${missionId}...`);
  }

  shareMission(missionId: number) {
    console.log(`Sharing mission ${missionId}...`);
  }

  bookmarkMission(missionId: number) {
    console.log(`Bookmarking mission ${missionId}...`);
  }

  // Advanced filtering
  filterByDateRange(startDate: string, endDate: string) {
    this.filteredMissions = this.missions.filter(mission => {
      const missionDate = new Date(mission.startDate);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return missionDate >= start && missionDate <= end;
    });
  }

  filterByHero(heroId: number) {
    this.filteredMissions = this.missions.filter(mission => 
      mission.assignedHeroes.includes(heroId)
    );
  }

  filterByLocation(location: string) {
    this.filteredMissions = this.missions.filter(mission => 
      mission.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  // Export functionality
  exportMissions() {
    const exportData = {
      missions: this.filteredMissions,
      stats: {
        total: this.missions.length,
        active: this.getActiveMissions(),
        completed: this.getCompletedMissions(),
        failed: this.getFailedMissions(),
        pending: this.getPendingMissions(),
        successRate: this.getSuccessRate()
      },
      exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `avengers-missions-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  }

  // Search functionality
  searchMissions(searchTerm: string) {
    if (!searchTerm.trim()) {
      this.applyFilters();
      return;
    }

    const term = searchTerm.toLowerCase();
    this.filteredMissions = this.missions.filter(mission =>
      mission.name.toLowerCase().includes(term) ||
      mission.description.toLowerCase().includes(term) ||
      mission.location.toLowerCase().includes(term) ||
      mission.objectives.some(obj => obj.toLowerCase().includes(term))
    );
  }

  // Real-time updates simulation
  simulateRealTimeUpdates() {
    setInterval(() => {
      // Simulate mission progress updates for active missions
      this.missions.forEach(mission => {
        if (mission.status === 'active') {
          // Simulate small progress changes
          console.log(`Mission ${mission.id} progress updated`);
        }
      });
    }, 60000); // Update every minute
  }

  // Mission analytics
  getMissionAnalytics() {
    return {
      totalMissions: this.missions.length,
      byStatus: {
        active: this.getActiveMissions(),
        completed: this.getCompletedMissions(),
        failed: this.getFailedMissions(),
        pending: this.getPendingMissions()
      },
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
      successRate: this.getSuccessRate(),
      averageDuration: this.getAverageTime(),
      totalHeroesDeployed: this.getTotalHeroesDeployed()
    };
  }
}