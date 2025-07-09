import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { WeatherTip } from '../../model/weather-tip.model';

/**
 * WeatherCardComponent displays current temperature, humidity,
 * and a recommended tip based on the humidity level.
 */
@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {
  /** Injected WeatherService to fetch weather and tips */
  private weatherService = inject(WeatherService);

  /** Current temperature in Celsius */
  temperature: number | null = null;

  /** Current humidity percentage */
  humidity: number | null = null;

  /** Tip based on the current humidity level */
  tip: string = '';

  /**
   * Lifecycle hook triggered on component initialization.
   * Fetches current weather and matches it to a corresponding tip.
   */
  ngOnInit(): void {
    this.weatherService.getWeatherAndTip().subscribe(({ weather, tips }) => {
      this.temperature = weather.temperature;
      this.humidity = weather.humidity;

      // Find the tip that matches the current humidity range
      const match = tips.find((t: WeatherTip) =>
          this.humidity! >= t.humidityRange[0] && this.humidity! <= t.humidityRange[1]
      );

      this.tip = match ? match.tip : 'No tip available.';
    });
  }
}
