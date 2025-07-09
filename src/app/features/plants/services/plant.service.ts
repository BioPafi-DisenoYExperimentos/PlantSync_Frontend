import { Injectable } from '@angular/core';
import { Plant } from '../model/plant';
import { BaseService } from "../../../shared/services/base.service";
import { environment } from "../../../../environments/environment.development";
import { catchError, Observable, retry } from "rxjs";

/**
 * PlantService handles all CRUD operations and filtering for plant entities.
 * It extends BaseService to inherit common RESTful methods.
 */
@Injectable({
  providedIn: 'root'
})
export class PlantService extends BaseService<Plant> {

  /** API endpoint for plant resources, configured via environment variables */
  override resourceEndpoint: string = environment.ENDPOINT_PATH_PLANTS;

  /**
   * Calls the parent constructor to initialize base HTTP configurations.
   */
  constructor() {
    super();
  }

  /**
   * Retrieves a plant by its ID.
   * @param id - Numeric or string-based plant ID
   * @returns Observable emitting the requested Plant
   */
  getPlantById(id: number | string): Observable<Plant> {
    return this.getById(id);
  }

  /**
   * Adds a new plant to the backend.
   * @param plant - Plant data without the `id` field
   * @returns Observable emitting the created Plant
   */
  addPlant(plant: Omit<Plant, 'id'>): Observable<Plant> {
    return this.create(plant as Plant);
  }

  /**
   * Updates an existing plant by ID.
   * @param id - ID of the plant to update
   * @param plant - Updated plant data
   * @returns Observable emitting the updated Plant
   */
  updatePlant(id: number | string, plant: Plant): Observable<Plant> {
    return this.update(id, plant);
  }

  /**
   * Deletes a plant by its ID.
   * @param id - ID of the plant to delete
   * @returns Observable with the delete operation result
   */
  deletePlant(id: number | string): Observable<any> {
    return this.delete(id);
  }

  /**
   * Retrieves all plants associated with a specific user profile.
   * @param profileId - ID of the profile
   * @returns Observable emitting an array of Plant objects
   */
  getPlantsByProfileId(profileId: number | string): Observable<Plant[]> {
    return this.http.get<Plant[]>(`${this.resourcePath()}/by-profile/${profileId}`, this.httpOptions)
        .pipe(
            retry(2), // Retry the request up to 2 times before failing
            catchError(this.handleError) // Handle and propagate any errors
        );
  }
}
