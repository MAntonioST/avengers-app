import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'heroes',
    loadComponent: () => import('./components/hero-list/hero-list.component').then(m => m.HeroListComponent)
  },
  {
    path: 'heroes/:id',
    loadComponent: () => import('./components/hero-detail/hero-detail.component').then(m => m.HeroDetailComponent)
  },
  {
    path: 'missions',
    loadComponent: () => import('./components/missions/missions.component').then(m => m.MissionsComponent)
  }
];