import { Injectable } from '@angular/core';
import { Plant } from '../model/plant';
import { BaseService} from "../../../shared/services/base.service";
import { environment} from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class PlantService extends BaseService<Plant> {

  override resourceEndpoint: string = environment.ENDPOINT_PATH_PLANTS;
  override serverBaseUrl: string = "http://localhost:3000/api/v1";


  constructor() {
    super();
  }




  getPlantById(id: number | string) {
    return this.getById(id);
  }

  addPlant(plant: Omit<Plant, 'id'>) {
    return this.create(plant as Plant);
  }

  updatePlant(id: number | string, plant: Plant) {
    return this.update(id, plant);
  }

  deletePlant(id: number | string) {
    return this.delete(id);
  }



  getPlantsByProfileId(profileId: number | string) {
    return this.getByQuery('profileId', profileId);
  }


}
