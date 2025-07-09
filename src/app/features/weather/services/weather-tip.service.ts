import { Injectable } from '@angular/core';
import { BaseService } from "../../../shared/services/base.service";
import { WeatherTip } from "../model/weather-tip.model";
import { environment } from "../../../../environments/environment.development";

/**
 * WeatherTipService provides CRUD operations for WeatherTip entities.
 *
 * This service extends the generic BaseService to interact with the backend
 * using the weather tips endpoint defined in the environment configuration.
 */
@Injectable({
  providedIn: 'root'
})
export class WeatherTipService extends BaseService<WeatherTip> {

  /** API endpoint for weather tips */
  override resourceEndpoint: string = environment.ENDPOINT_PATH_WEATHER_TIPS;

  constructor() {
    super();
  }
}
