import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { DemosComponent } from './pages/demos/demos.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MovieListComponent } from './applications/movie-list/movie-list.component';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'demos', loadComponent: () => import('./pages/demos/demos.component').then(m => m.DemosComponent) },
  { path: 'projects', loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'movie-list', loadComponent: () => import('./applications/movie-list/movie-list.component').then(m => m.MovieListComponent) },
  { path: 'todo', loadComponent: () => import('./applications/todo/todolist/todolist.component').then(m => m.TodoListComponent) }
];

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes))
  ]
};
