import { Routes } from '@angular/router';
import { SidebarLayoutComponent } from './shared/components/sidebar-layout/sidebar-layout.component';
import { plantsRoutes } from './features/plants/plants-routing.module';

import {tasksRoutes} from "./features/tasks/tasks-routing.module";
import {chatbotRoutes} from "./features/chatbot/chatbot-routing.module";

import {configRoutes} from "./features/profile/config.routing.module";
import { guidesRoutes } from './features/guides/guides-routing.module';
import {authGuard} from "./core/guards/auth.guard";


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },


    {
        path: 'login',
        loadComponent: () =>
            import('./features/auth/pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () =>
            import('./features/auth/pages/register/register.component').then(m => m.RegisterComponent)
    },
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

            { path: 'chatbot',
                children: chatbotRoutes },

            {
                path: 'guides',
                children: guidesRoutes
            },
            {
                path: 'configuration',
                children: configRoutes
            }

        ]
    }
];
