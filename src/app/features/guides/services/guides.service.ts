import { Injectable } from '@angular/core';
import { Guide } from '../model/guide.model';
import { BaseService } from "../../../shared/services/base.service";
import { environment } from "../../../../environments/environment.development";
import { Observable } from 'rxjs';

/**
 * GuidesService provides methods for retrieving guide data from the backend.
 * It extends the BaseService to inherit standard CRUD operations.
 */
@Injectable({
    providedIn: 'root'
})
export class GuidesService extends BaseService<Guide> {

    /** Endpoint path for the guides resource, configured from environment variables */
    override resourceEndpoint: string = environment.ENDPOINT_PATH_GUIDES;

    /**
     * Calls the parent constructor to initialize the base service.
     */
    constructor() {
        super();
    }

    /**
     * Retrieves the full list of available guides.
     * @returns Observable emitting an array of Guide objects
     */
    getGuides(): Observable<Guide[]> {
        return this.getAll();
    }

    /**
     * Retrieves a specific guide by its ID.
     * @param id - ID of the guide to retrieve
     * @returns Observable emitting the Guide object
     */
    getGuideById(id: number): Observable<Guide> {
        return this.getById(id);
    }
}
