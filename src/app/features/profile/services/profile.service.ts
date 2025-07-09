import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../../../environments/environment.development";
import { Profile } from "../model/profile.entity";
import { BaseService } from "../../../shared/services/base.service";

/**
 * Service for managing Profile-related API operations.
 * Extends the generic BaseService to provide additional methods specific to Profile handling.
 */
@Injectable({
    providedIn: 'root'
})
export class ProfileService extends BaseService<Profile> {

    /**
     * API endpoint for profiles, defined in the environment configuration.
     */
    override resourceEndpoint = environment.ENDPOINT_PATH_PROFILES;

    /**
     * Full API URL used for direct HTTP requests.
     */
    private apiUrl = `${this.serverBaseUrl}${this.resourceEndpoint}`;

    constructor() {
        super();
    }

    /**
     * Creates a new profile by sending a POST request to the API.
     * @param profile The profile object to be created.
     * @returns Observable emitting the created Profile.
     */
    createProfile(profile: Profile): Observable<Profile> {
        return this.http.post<Profile>(this.apiUrl, profile);
    }

    /**
     * Retrieves a profile by the associated user ID.
     * Uses a custom query endpoint `by-user-id`.
     * @param userId The ID of the user to find the profile for.
     * @returns Observable emitting the matched Profile(s).
     */
    getByUserId(userId: number) {
        return this.getByQuery('by-user-id', `userId=${userId}`);
    }
}
