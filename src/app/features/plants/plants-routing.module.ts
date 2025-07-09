import { Routes } from '@angular/router';

/**
 * Defines the routing configuration for the Plants module.
 * Includes routes for listing, adding, editing, viewing, and history tracking of plants.
 */
export const plantsRoutes: Routes = [
  {
    path: '',
    // Route for displaying the user's list of plants
    loadComponent: () =>
        import('./pages/mis-plantas/mis-plantas.component').then(m => m.MisPlantasComponent)
  },
  {
    path: 'add',
    // Route for adding a new plant
    loadComponent: () =>
        import('./components/plant-form/plant-form.component').then(m => m.PlantFormComponent)
  },
  {
    path: ':id',
    // Route for viewing plant details
    loadComponent: () =>
        import('./pages/plant-detail/plant-detail.component').then(m => m.PlantDetailComponent)
  },
  {
    path: ':id/edit',
    // Route for editing an existing plant
    loadComponent: () =>
        import('./components/plant-form/plant-form.component').then(m => m.PlantFormComponent)
  },
  {
    path: ':id/history',
    // Route for viewing a plant's humidity and care history
    loadComponent: () =>
        import('./pages/plant-history-view/plant-history-view.component').then(m => m.PlantHistoryViewComponent)
  }
];
