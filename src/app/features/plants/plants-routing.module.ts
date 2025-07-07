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
        import('./pages/plant-form/plant-form.page').then(m => m.PlantFormPage)
  },
  {
    path: ':id',
    loadComponent: () =>
        import('./pages/plant-detail/plant-detail.component').then(m => m.PlantDetailComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () =>
        import('./pages/plant-form/plant-form.page').then(m => m.PlantFormPage)
  },
  {
    path: ':id/history',
    loadComponent: () =>
        import('./pages/plant-history-view/plant-history-view.component').then(m => m.PlantHistoryViewComponent)
  }
];
