import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../model/plant';
import { WeatherCardComponent } from "../../../weather/components/weather-card/weather-card.component";

// Importaciones para el Dialog de Angular Material
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskConfirmationDialogComponent } from '../../../tasks/components/task-confirmation-dialog/task-confirmation-dialog.component';

@Component({
  selector: 'app-plant-detail',
  standalone: true,
  // IMPORTANTE: Añadir MatDialogModule aquí
  imports: [CommonModule, RouterModule, WeatherCardComponent, MatDialogModule],
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.css']
})
export class PlantDetailComponent implements OnInit {
  plant!: Plant;
  plantId!: number;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private plantService: PlantService,
      private dialog: MatDialog // Inyectamos el servicio de Dialog
  ) {}

  ngOnInit(): void {
    this.plantId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPlant();
  }

  loadPlant(): void {
    this.plantService.getPlantById(this.plantId).subscribe(data => this.plant = data);
  }

  onDelete(): void {
    // Abrimos tu Dialog de confirmación personalizado
    const dialogRef = this.dialog.open(TaskConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Eliminar Planta',
        message: `¿Estás seguro de que deseas eliminar a "${this.plant.name}"? Esta acción eliminará también sus tareas asociadas y no se puede deshacer.`
      }
    });

    // Escuchamos la respuesta del Dialog (true si le dio a Confirmar, false si Canceló)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.plantService.deletePlant(this.plantId).subscribe(() => {
          this.router.navigate(['/plants']);
        });
      }
    });
  }
}