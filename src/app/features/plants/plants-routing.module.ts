import { Routes } from '@angular/router';

export const plantsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
        import('./pages/mis-plantas/mis-plantas.component').then(m => m.MisPlantasComponent)
  },
  {
    path: 'add',
    loadComponent: () =>
        import('./components/plant-form/plant-form.component').then(m => m.PlantFormComponent)
  },
  {
    path: ':id',
    loadComponent: () =>
        import('./pages/plant-detail/plant-detail.component').then(m => m.PlantDetailComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () =>
        import('./components/plant-form/plant-form.component').then(m => m.PlantFormComponent)
  },
  {
    path: ':id/history',
    loadComponent: () =>
        import('./pages/plant-history-view/plant-history-view.component').then(m => m.PlantHistoryViewComponent)
  }
];
