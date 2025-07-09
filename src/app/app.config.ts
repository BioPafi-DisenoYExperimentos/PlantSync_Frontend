import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

/**
 * The main application configuration object.
 *
 * This configuration sets up core providers for Angular's change detection
 * and the application’s router.
 */
export const appConfig: ApplicationConfig = {
  /**
   * List of global providers for the application.
   * - `provideZoneChangeDetection` enables fine-tuned change detection behavior with event coalescing.
   * - `provideRouter` registers the application's routes.
   */
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
