import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlantHistory } from '../model/plant-history.model';
import { environment } from "../../../../environments/environment.development";
import { BaseService } from "../../../shared/services/base.service";

/**
 * PlantHistoryService provides methods for accessing historical
 * humidity and care data associated with plants.
 * It extends BaseService for standard CRUD operations.
 */
@Injectable({
  providedIn: 'root'
})
export class PlantHistoryService extends BaseService<PlantHistory> {

  /** Custom API URL for accessing plant history records */
  private apiUrl = `${this.serverBaseUrl}/plantHistory`;

  /**
   * Initializes the service and sets up base HTTP configurations.
   */
  constructor() {
    super();
  }

  /**
   * Retrieves all historical records for a specific plant.
   * The result is sorted by date in descending order.
   *
   * @param plantId - ID of the plant whose history is being requested
   * @returns Observable emitting an array of PlantHistory entries
   */
  getPlantHistoryByPlantId(plantId: number): Observable<PlantHistory[]> {
    return this.http.get<PlantHistory[]>(
        `${this.apiUrl}?plantId=${plantId}&_sort=date&_order=desc`
    );
  }
}
