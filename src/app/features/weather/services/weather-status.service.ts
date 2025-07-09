import { Injectable } from '@angular/core';
import { BaseService } from "../../../shared/services/base.service";
import { WeatherStatus } from "../model/weather-status.model";
import { environment } from "../../../../environments/environment.development";

/**
 * WeatherStatusService handles CRUD operations for WeatherStatus entities
 * by extending the generic BaseService.
 *
 * This service communicates with the backend API using the endpoint defined
 * in the environment configuration.
 */
@Injectable({
  providedIn: 'root'
})
export class WeatherStatusService extends BaseService<WeatherStatus> {

  /** API endpoint for weather status data */
  override resourceEndpoint: string = environment.ENDPOINT_PATH_WEATHER_STATUS;

  constructor() {
    super();
  }
}
