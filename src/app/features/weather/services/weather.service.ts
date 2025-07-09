import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { WeatherStatus } from '../model/weather-status.model';
import { WeatherTip } from '../model/weather-tip.model';
import { RealWeatherService } from './real-weather.service';

/**
 * WeatherService integrates real-time weather data with predefined tips based on humidity.
 * It delegates weather retrieval to RealWeatherService and provides relevant plant care advice.
 */
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private realWeatherService: RealWeatherService) {}

  /**
   * Retrieves weather information for a predefined city and provides tips based on humidity level.
   * @returns An observable that emits an object containing:
   *  - `weather`: a `WeatherStatus` instance with temperature and humidity.
   *  - `tips`: an array of `WeatherTip` objects with humidity ranges and corresponding recommendations.
   */
  getWeatherAndTip(): Observable<{ weather: WeatherStatus; tips: WeatherTip[] }> {
    const city = 'Lima';  // Default city; this could be dynamic in future versions

    const weather$ = this.realWeatherService.getWeatherByCity(city);

    const tips: WeatherTip[] = [
      { humidityRange: [0, 30], tip: 'Riega tus plantas más seguido.' },
      { humidityRange: [31, 60], tip: 'Condiciones óptimas.' },
      { humidityRange: [61, 100], tip: 'Reduce el riego para evitar excesos de agua.' }
    ];
    const tips$ = of(tips);

    return forkJoin({ weather: weather$, tips: tips$ });
  }
}
