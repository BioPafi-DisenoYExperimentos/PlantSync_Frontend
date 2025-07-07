
import { HttpInterceptorFn } from '@angular/common/http';

import {catchError} from "rxjs";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('authToken');

    const authReq = token
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : req;

    return next(authReq).pipe(
        catchError((err) => {
            if (err.status === 401) {
                console.warn('401 detectado. El token puede ser inválido o el usuario no tiene permiso.');

            }
            throw err;
        })
    );
};
