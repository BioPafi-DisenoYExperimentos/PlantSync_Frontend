import { Routes } from '@angular/router';
import { ChatbotPageComponent } from './pages/chatbot-page/chatbot-page.component';

/**
 * Defines the routes for the Chatbot module.
 * Currently maps the root path of this module to the ChatbotPageComponent.
 */
export const chatbotRoutes: Routes = [
    {
        path: '',
        component: ChatbotPageComponent
    }
];
