import { bootstrapApplication } from '@angular/platform-browser';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import {provideNativeDateAdapter} from "@angular/material/core";
import {AuthInterceptor} from "./app/features/auth/services/auth.interceptor";


bootstrapApplication(AppComponent, {
    ...appConfig,
    providers: [
        ...appConfig.providers!,
        provideHttpClient(withInterceptors([AuthInterceptor])),
        provideNativeDateAdapter(),

    ]
});
