import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddTaskDialogComponent } from '../../components/add-task-dialog/add-task-dialog.component';
import { LanguageService} from "../../../../shared/services/language.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-view',
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.css'],
  standalone: true,
  imports: [CommonModule, TaskListComponent, MatButtonModule, MatIconModule, MatDialogModule],
})
export class TaskViewComponent implements OnInit, OnDestroy {
  @ViewChild(TaskListComponent) taskListComponent!: TaskListComponent;

  title: string = '';
  addTaskLabel: string = '';
  private langSub?: Subscription;

  constructor(
      private dialog: MatDialog,
      private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.langSub = this.languageService.lang$.subscribe((lang: 'es' | 'en') => {
      this.title = this.languageService.getLabel('tasks', 'title');
      this.addTaskLabel = lang === 'es' ? 'Añadir tarea' : 'Add Task';
    });
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }

  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskListComponent.refreshTasks();
      }
    });
  }
}
