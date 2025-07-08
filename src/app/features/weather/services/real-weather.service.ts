import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { WeatherStatus } from '../model/weather-status.model';
import {environment} from "../../../../environments/environment.development";

@Injectable({
    providedIn: 'root'
})
export class RealWeatherService {
    private baseUrl = `${environment.BASE_URL}/weather/city`;

    constructor(private http: HttpClient) {}

    getWeatherByCity(city: string): Observable<WeatherStatus> {
        const url = `${this.baseUrl}?city=${encodeURIComponent(city)}`;
        return this.http.get<any>(url).pipe(
            map(data => ({
                id: 0,
                location: data.name,
                temperature: data.main.temp,
                humidity: data.main.humidity
            }))
        );
    }
}