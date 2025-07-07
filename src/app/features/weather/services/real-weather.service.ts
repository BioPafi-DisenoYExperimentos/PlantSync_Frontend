import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { WeatherStatus } from '../model/weather-status.model';

@Injectable({
    providedIn: 'root'
})
export class RealWeatherService {
    private apiKey = 'f2aae48671e29e04c682372baceebe65';
    private baseUrl = 'http://localhost:8080/api/v1/weather/city'; // o tu URL en Azure

    constructor(private http: HttpClient) {}

    getWeatherByCity(city: string): Observable<WeatherStatus> {
        const url = `${this.baseUrl}?city=${city}`;
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
