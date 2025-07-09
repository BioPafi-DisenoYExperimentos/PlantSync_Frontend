import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PlantHistoryService } from '../../services/plant-history.service';
import { PlantHistory } from '../../model/plant-history.model';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

/**
 * PlantHistoryViewComponent displays a humidity trend chart
 * for a given plant based on its historical records.
 */
@Component({
  standalone: true,
  selector: 'app-plant-history-view',
  imports: [CommonModule, NgChartsModule, RouterLink],
  templateUrl: './plant-history-view.component.html',
  styleUrls: ['./plant-history-view.component.css']
})
export class PlantHistoryViewComponent implements OnInit {
  /** Injected route to retrieve plant ID from URL parameters */
  private route = inject(ActivatedRoute);

  /** Injected service to fetch plant history records */
  private historyService = inject(PlantHistoryService);

  /** ID of the plant whose history is being viewed */
  plantId!: number;

  /** List of plant history records */
  history: PlantHistory[] = [];

  /** Chart data configuration for humidity history line chart */
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Humedad (%)',
        fill: false,
        tension: 0.3,
      }
    ]
  };

  /** Chart options for customizing appearance and scaling */
  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: 'Humedad (%)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Fecha'
        }
      }
    }
  };

  /**
   * Lifecycle hook that retrieves plant ID and loads history data on initialization.
   * Updates the chart with localized date labels and humidity values.
   */
  ngOnInit(): void {
    this.plantId = Number(this.route.snapshot.paramMap.get('id'));

    this.historyService.getPlantHistoryByPlantId(this.plantId).subscribe(data => {
      this.history = data;

      const labels = data.map(d =>
          new Date(d.date).toLocaleDateString('es-PE', { day: '2-digit', month: 'short' })
      );

      const values = data.map(d => d.humidity);

      this.lineChartData = {
        labels: labels,
        datasets: [
          {
            data: values,
            label: 'Humedad (%)',
            fill: false,
            tension: 0.3,
            borderColor: '#66bb6a',
            backgroundColor: '#c8e6c9',
            pointRadius: 5,
            pointHoverRadius: 7
          }
        ]
      };
    });
  }
}
