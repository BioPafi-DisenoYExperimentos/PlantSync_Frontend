
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from "../../services/task.service";
import {Task, TaskViewModel} from "../../model/task.entity";
import { TaskConfirmationDialogComponent } from "../task-confirmation-dialog/task-confirmation-dialog.component";
import { TaskItemComponent } from "../task-item/task-item.component";
import { NgForOf } from "@angular/common";
import {PlantService} from "../../../plants/services/plant.service";
import {forkJoin} from "rxjs";


@Component({
  selector: 'app-task-list', // Component selector used in HTML
  templateUrl: './task-list.component.html', // HTML template file
  imports: [
    TaskItemComponent, // Import the custom task item component
    NgForOf,

    // Required for *ngFor directive
  ],
  styleUrls: ['./task-list.component.css'] // CSS style for the component
})
export class TaskListComponent implements OnInit {
  todayTasks: TaskViewModel[] = [];
  upcomingTasks: TaskViewModel[] = [];

  constructor(
      private taskService: TaskService,
      public dialog: MatDialog,
      private plantService: PlantService
  ) {}

  ngOnInit(): void {
    this.refreshTasks();
  }

  public refreshTasks(): void {
    const currentProfile = JSON.parse(localStorage.getItem('currentProfile') || '{}');
    const currentProfileId = currentProfile.id;

    forkJoin({
      tasks: this.taskService.getAll(),
      plants: this.plantService.getAll()
    }).subscribe(({ tasks, plants }) => {
      const userPlants = plants.filter(p => p.profileId === currentProfileId);

      const taskViewModels: TaskViewModel[] = tasks
          .map(task => {
            const plant = userPlants.find(p => p.id === task.plantId);
            if (!plant) return null;
            return {
              ...task,
              plantName: plant.name,
              imageUrl: plant.imageUrl
            } as TaskViewModel;
          })
          .filter((t): t is TaskViewModel => t !== null);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const parseLocalDate = (dateStr: string): Date => {
        const [year, month, day] = dateStr.split('-').map(Number);
        const d = new Date(year, month - 1, day);
        d.setHours(0, 0, 0, 0);
        return d;
      };

      this.todayTasks = taskViewModels.filter(t => {
        const taskDate = parseLocalDate(t.date);
        return taskDate.getTime() === today.getTime();
      });

      this.upcomingTasks = taskViewModels.filter(t => {
        const taskDate = parseLocalDate(t.date);
        return taskDate.getTime() > today.getTime();
      });
    });
  }

  openDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskConfirmationDialogComponent, {
      width: '250px',
      data: { task: task }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask(task.id);
      }
    });
  }


  // Removes a task by ID from both today's and upcoming tasks
  deleteTask(id: number): void {
    this.taskService.delete(id).subscribe({
      next: () => {
        this.todayTasks = this.todayTasks.filter(task => task.id !== id);
        this.upcomingTasks = this.upcomingTasks.filter(task => task.id !== id);
        this.refreshTasks();
      },
      error: (err) => {
        console.error('Error al eliminar la tarea:', err);
      }
    });
  }


}
