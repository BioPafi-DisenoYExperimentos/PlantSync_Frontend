import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../model/user.entity";
import { BaseService } from "../../../shared/services/base.service";

/**
 * AuthService handles user authentication operations such as registration (sign-up)
 * and login (sign-in). It extends the generic BaseService for User-related HTTP operations.
 */
@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService<User> {

    /** Base URL for authentication-related API endpoints */
    private apiUrl = `${this.serverBaseUrl}/authentication`;

    /**
     * Registers a new user with the provided data, including subscription plan.
     * @param user - Object containing name, email, password, and subscription plan
     * @returns Observable emitting the created User object
     */
    signUp(user: {
        name: string;
        email: string;
        password: string;
        subscriptionPlan: string;
    }): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/sign-up`, user);
    }

    /**
     * Authenticates a user using email and password credentials.
     * @param credentials - Object containing email and password
     * @returns Observable emitting the authentication response, including token and user data
     */
    signIn(credentials: { email: string; password: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/sign-in`, credentials);
    }
}
