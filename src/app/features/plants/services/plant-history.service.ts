import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlantHistory } from '../model/plant-history.model';
import { environment } from "../../../../environments/environment.development";
import {BaseService} from "../../../shared/services/base.service";
import {PlantService} from "./plant.service";

@Injectable({
  providedIn: 'root'
})
export class PlantHistoryService extends BaseService<PlantHistory>{



  private apiUrl = `${this.serverBaseUrl}/plantHistory`;

  constructor() {
    super();
  }


  getPlantHistoryByPlantId(plantId: number): Observable<PlantHistory[]> {
    return this.http.get<PlantHistory[]>(`${this.apiUrl}?plantId=${plantId}&_sort=date&_order=desc`);
  }
}
