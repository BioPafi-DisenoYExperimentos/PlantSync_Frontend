import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../../../environments/environment.development";
import { User } from "../model/user.entity";
import { BaseService } from "../../../shared/services/base.service";

/**
 * UserService provides operations related to user management,
 * including registration, login, update, and integration with Stripe payments.
 * Extends BaseService for standard CRUD operations.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {

  /** Defines the endpoint path for user-related resources from the environment config */
  override resourceEndpoint = environment.ENDPOINT_PATH_USERS;

  /** Full API URL composed using base server URL and resource endpoint */
  private apiUrl = `${this.serverBaseUrl}${this.resourceEndpoint}`;

  constructor() {
    super();
  }

  /**
   * Retrieves a list of users filtered by email.
   * Useful for checking if a user already exists.
   *
   * @param email - Email to search for
   * @returns Observable emitting an array of User objects
   */
  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}`);
  }

  /**
   * Registers a new user via the backend API.
   *
   * @param user - User object with required fields
   * @returns Observable emitting the created User object
   */
  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/sign-up`, user);
  }

  /**
   * Authenticates a user using email and password credentials.
   *
   * @param credentials - Object containing email and password
   * @returns Observable emitting the authenticated User object
   */
  signIn(credentials: { email: string, password: string }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/sign-in`, credentials);
  }

  /**
   * Updates an existing user's data by ID.
   *
   * @param id - User ID
   * @param user - Updated user data
   * @returns Observable emitting the updated User object
   */
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  /**
   * Initiates a Stripe checkout session for the given user and subscription plan.
   * This simulates the creation of a payment session.
   *
   * @param userId - ID of the user
   * @param plan - Subscription plan selected (e.g., 'basic', 'premium', 'pro')
   * @returns Observable emitting an object with a `url` for redirection
   */
  createStripeSession(userId: number, plan: string): Observable<{ url: string }> {
    return this.http.post<{ url: string }>(
        'http://localhost:8080/api/payments/create-session',
        { userId, subscriptionPlan: plan }
    );
  }
}
