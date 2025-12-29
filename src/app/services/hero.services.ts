import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero, Mission } from '../models/hero.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroes: Hero[] = [
    {
      id: 1,
      name: 'Iron Man',
      realName: 'Tony Stark',
      avatar: '🤖',
      description: 'Genius, billionaire, playboy, philanthropist. Tony Stark is a brilliant inventor and engineer who created the Iron Man armor.',
      affiliation: 'Avengers',
      status: 'active',
      powers: ['Genius Intelligence', 'Powered Armor', 'Flight', 'Repulsors'],
      equipment: ['Mark 85 Armor', 'Arc Reactor', 'FRIDAY AI', 'Repulsors'],
      stats: {
        strength: 85,
        intelligence: 100,
        speed: 70,
        durability: 85,
        energy: 95,
        fighting: 75
      }
    },
    {
      id: 2,
      name: 'Captain America',
      realName: 'Steve Rogers',
      avatar: '🛡️',
      description: 'The First Avenger. Enhanced to the peak of human perfection by an experimental serum, Steve Rogers became the symbol of freedom.',
      affiliation: 'Avengers',
      status: 'active',
      powers: ['Super Strength', 'Enhanced Speed', 'Leadership', 'Shield Mastery'],
      equipment: ['Vibranium Shield', 'Uniform', 'Motorcycle'],
      stats: {
        strength: 90,
        intelligence: 75,
        speed: 80,
        durability: 90,
        energy: 60,
        fighting: 95
      }
    },
    {
      id: 3,
      name: 'Thor',
      realName: 'Thor Odinson',
      avatar: '⚡',
      description: 'The God of Thunder from Asgard. Wields the mighty hammer Mjolnir and commands the power of lightning.',
      affiliation: 'Avengers, Asgard',
      status: 'active',
      powers: ['Lightning Control', 'Super Strength', 'Flight', 'Immortality'],
      equipment: ['Mjolnir', 'Stormbreaker', 'Asgardian Armor'],
      stats: {
        strength: 100,
        intelligence: 70,
        speed: 85,
        durability: 95,
        energy: 100,
        fighting: 90
      }
    },
    {
      id: 4,
      name: 'Hulk',
      realName: 'Bruce Banner',
      avatar: '💚',
      description: 'A brilliant scientist transformed into a green behemoth of incredible strength when angered.',
      affiliation: 'Avengers',
      status: 'active',
      powers: ['Unlimited Strength', 'Regeneration', 'Immunity', 'Genius Intelligence'],
      equipment: ['Stretchy Pants'],
      stats: {
        strength: 100,
        intelligence: 95,
        speed: 75,
        durability: 100,
        energy: 70,
        fighting: 80
      }
    },
    {
      id: 5,
      name: 'Black Widow',
      realName: 'Natasha Romanoff',
      avatar: '🕷️',
      description: 'A highly trained spy and assassin with unmatched combat skills and tactical expertise.',
      affiliation: 'Avengers, S.H.I.E.L.D.',
      status: 'retired',
      powers: ['Master Spy', 'Expert Combatant', 'Weapons Mastery', 'Tactical Genius'],
      equipment: ['Widow\'s Bite', 'Grappling Hook', 'Various Weapons'],
      stats: {
        strength: 70,
        intelligence: 85,
        speed: 90,
        durability: 75,
        energy: 60,
        fighting: 95
      }
    },
    {
      id: 6,
      name: 'Hawkeye',
      realName: 'Clint Barton',
      avatar: '🏹',
      description: 'The world\'s greatest marksman with perfect accuracy and a variety of specialized arrows.',
      affiliation: 'Avengers',
      status: 'inactive',
      powers: ['Perfect Accuracy', 'Expert Marksman', 'Tactical Skills', 'Acrobatics'],
      equipment: ['Compound Bow', 'Trick Arrows', 'Tactical Suit'],
      stats: {
        strength: 70,
        intelligence: 80,
        speed: 85,
        durability: 75,
        energy: 65,
        fighting: 90
      }
    }
  ];

  private missions: Mission[] = [
    {
      id: 1,
      title: 'Chitauri Invasion Defense',
      description: 'Defend New York City from the Chitauri invasion through the portal.',
      location: 'New York City',
      date: new Date('2012-05-04'),
      status: 'completed',
      threatLevel: 'critical',
      assignedHeroes: [1, 2, 3, 4, 5, 6]
    },
    {
      id: 2,
      title: 'Hydra Base Infiltration',
      description: 'Infiltrate and destroy Hydra research facility in Sokovia.',
      location: 'Sokovia',
      date: new Date('2015-03-15'),
      status: 'completed',
      threatLevel: 'high',
      assignedHeroes: [1, 2, 3, 4, 5, 6]
    },
    {
      id: 3,
      title: 'Thanos Threat Assessment',
      description: 'Investigate reports of cosmic threat approaching Earth.',
      location: 'Various Locations',
      date: new Date('2024-12-28'),
      status: 'active',
      threatLevel: 'critical',
      assignedHeroes: [1, 2, 3, 4]
    },
    {
      id: 4,
      title: 'Bank Robbery Response',
      description: 'Stop armed robbery in downtown Manhattan.',
      location: 'Manhattan, NY',
      date: new Date('2024-12-27'),
      status: 'active',
      threatLevel: 'low',
      assignedHeroes: [1, 6]
    }
  ];

  getHeroes(): Observable<Hero[]> {
    return of(this.heroes);
  }

  getHero(id: number): Hero | undefined {
    return this.heroes.find(hero => hero.id === id);
  }

  getMissions(): Observable<Mission[]> {
    return of(this.missions);
  }

  getMission(id: number): Mission | undefined {
    return this.missions.find(mission => mission.id === id);
  }

  // Dashboard stats
  getActiveHeroes(): number {
    return this.heroes.filter(hero => hero.status === 'active').length;
  }

  getActiveMissions(): number {
    return this.missions.filter(mission => mission.status === 'active').length;
  }

  getCurrentThreatLevel(): string {
    const activeMissions = this.missions.filter(mission => mission.status === 'active');
    if (activeMissions.some(mission => mission.threatLevel === 'critical')) {
      return 'critical';
    }
    if (activeMissions.some(mission => mission.threatLevel === 'high')) {
      return 'high';
    }
    if (activeMissions.some(mission => mission.threatLevel === 'medium')) {
      return 'medium';
    }
    return 'low';
  }
}