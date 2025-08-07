import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home-example/home')
    .then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/access/login/login')
    .then(m => m.Login)
  },
  {
    path: 'signup',
    loadComponent: () => import('./features/access/signup/signup')
    .then(m => m.Signup)
  },
  {
    path: 'customer',
    loadComponent: () => import('./features/user/customer/customer')
    .then(m => m.Customer),
    children: [
      {
      path: 'dashboard',
      loadComponent: () => import('./features/user/customer/components/dashboard/dashboard')
      .then(m => m.Dashboard),
      },
    ]
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/user/admin/admin')
    .then(m => m.Admin),
    children: [
      {
      path: 'dashboard',
      loadComponent: () => import('./features/user/admin/components/dashboard/dashboard')
      .then(m => m.Dashboard),
      },
    ]
  }
];