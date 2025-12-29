import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeroService } from '../../services/hero.services';
import { Hero } from '../../models/hero.interface';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit {
  heroes: Hero[] = [];
  filteredHeroes: Hero[] = [];
  selectedFilter: string = 'all';

  constructor(
    private heroService: HeroService,
    private router: Router
  ) {}

  ngOnInit() {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
      this.filteredHeroes = heroes;
    });
  }

  filterHeroes(filter: string) {
    this.selectedFilter = filter;
    
    switch(filter) {
      case 'active':
        this.filteredHeroes = this.heroes.filter(hero => hero.status === 'active');
        break;
      case 'inactive':
        this.filteredHeroes = this.heroes.filter(hero => hero.status === 'inactive');
        break;
      case 'retired':
        this.filteredHeroes = this.heroes.filter(hero => hero.status === 'retired');
        break;
      default:
        this.filteredHeroes = this.heroes;
    }
  }

  viewHeroDetails(heroId: number) {
    this.router.navigate(['/heroes', heroId]);
  }

  getActiveHeroes(): number {
    return this.heroes.filter(hero => hero.status === 'active').length;
  }

  getRetiredHeroes(): number {
    return this.heroes.filter(hero => hero.status === 'retired').length;
  }

  getStatusIcon(status: string): string {
    switch(status) {
      case 'active': return 'check_circle';
      case 'inactive': return 'pause_circle';
      case 'retired': return 'cancel';
      default: return 'help';
    }
  }

  calculateOverallPower(hero: Hero): number {
    const stats = hero.stats;
    return Math.round((stats.strength + stats.intelligence + stats.speed + 
                      stats.durability + stats.energy + stats.fighting) / 6);
  }

  getPowerLevelClass(hero: Hero): string {
    const power = this.calculateOverallPower(hero);
    if (power >= 90) return 'legendary';
    if (power >= 80) return 'epic';
    if (power >= 70) return 'rare';
    return 'common';
  }

  getPowerLevelText(hero: Hero): string {
    const power = this.calculateOverallPower(hero);
    if (power >= 90) return 'Legendary';
    if (power >= 80) return 'Epic';
    if (power >= 70) return 'Rare';
    return 'Common';
  }

  trackByHero(index: number, hero: Hero): number {
    return hero.id;
  }
}