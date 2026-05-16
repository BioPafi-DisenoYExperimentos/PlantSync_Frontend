import { Routes } from '@angular/router';
import { SidebarLayoutComponent } from './shared/components/sidebar-layout/sidebar-layout.component';
import { plantsRoutes } from './features/plants/plants-routing.module';
import { tasksRoutes } from "./features/tasks/tasks-routing.module";
import { chatbotRoutes } from "./features/chatbot/chatbot-routing.module";
import { configRoutes } from "./features/profile/config.routing.module";
import { guidesRoutes } from './features/guides/guides-routing.module';
import { authGuard } from "./core/guards/auth.guard";

/**
 * Application route definitions for the Angular Router.
 *
 * This configuration defines:
 * - Redirects for the root path.
 * - Lazy-loaded login and register pages.
 * - Protected routes nested under a sidebar layout for authenticated users.
 */
export const routes: Routes = [
    /**
     * Default route: redirect to login page.
     */
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },

    /**
     * Public route: login component (lazy-loaded).
     */
    {
        path: 'login',
        loadComponent: () =>
            import('./features/auth/pages/login/login.component').then(m => m.LoginComponent)
    },

    /**
     * Public route: register component (lazy-loaded).
     */
    {
        path: 'register',
        loadComponent: () =>
            import('./features/auth/pages/register/register.component').then(m => m.RegisterComponent)
    },

    /**
     * Protected routes: accessible only when authenticated.
     * Wrapped in a sidebar layout and guarded by `authGuard`.
     */
    {
        path: '',
        component: SidebarLayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'plants', pathMatch: 'full' },

            {
                path: 'plants',
                children: plantsRoutes
            },
            {
                path: 'tasks',
                children: tasksRoutes
            },
            {
                path: 'chatbot',
                children: chatbotRoutes
            },
            {
                path: 'guides',
                children: guidesRoutes
            },
            {
                path: 'config',
                children: configRoutes
            }
        ]
    }
];
