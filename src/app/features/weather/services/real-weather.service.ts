import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { WeatherStatus } from '../model/weather-status.model';
import { environment } from "../../../../environments/environment.development";

/**
 * Service that retrieves real-time weather data by city name.
 * It transforms the external API response into a standardized `WeatherStatus` object.
 */
@Injectable({
    providedIn: 'root'
})
export class RealWeatherService {
    private baseUrl = `${environment.BASE_URL}/weather/city`;

    constructor(private http: HttpClient) {}

    /**
     * Fetches the current weather information for a given city.
     * @param city - The name of the city to retrieve weather data for.
     * @returns An observable that emits a `WeatherStatus` object with temperature and humidity data.
     */
    getWeatherByCity(city: string): Observable<WeatherStatus> {
        const url = `${this.baseUrl}?city=${encodeURIComponent(city)}`;
        return this.http.get<any>(url).pipe(
            map(data => ({
                id: 0, // Assigned statically; can be replaced with real ID if needed
                location: data.name,
                temperature: data.main.temp,
                humidity: data.main.humidity
            }))
        );
    }
}
