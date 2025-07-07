
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../../../environments/environment.development";
import { Profile} from "../model/profile.entity";
import {BaseService} from "../../../shared/services/base.service";

@Injectable({
    providedIn: 'root'
})
export class ProfileService extends BaseService<Profile> {

    override resourceEndpoint = environment.ENDPOINT_PATH_PROFILES;

    private apiUrl = `${this.serverBaseUrl}${this.resourceEndpoint}`;


    constructor() {
        super();
    }



    createProfile(profile: Profile): Observable<Profile> {
        return this.http.post<Profile>(this.apiUrl, profile);
    }


    getByUserId(userId: number) {
        return this.getByQuery('by-user-id', `userId=${userId}`);
    }


}