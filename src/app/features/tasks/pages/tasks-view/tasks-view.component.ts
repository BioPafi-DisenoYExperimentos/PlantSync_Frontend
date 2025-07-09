import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddTaskDialogComponent } from '../../components/add-task-dialog/add-task-dialog.component';
import { LanguageService } from "../../../../shared/services/language.service";
import { Subscription } from 'rxjs';

/**
 * TaskViewComponent serves as the main view for managing and displaying user tasks.
 * It includes a button to add new tasks via a dialog and dynamically updates text based on language settings.
 */
@Component({
  selector: 'app-task-view',
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.css'],
  standalone: true,
  imports: [CommonModule, TaskListComponent, MatButtonModule, MatIconModule, MatDialogModule],
})
export class TaskViewComponent implements OnInit, OnDestroy {
  /** Reference to the child TaskListComponent to trigger refreshes */
  @ViewChild(TaskListComponent) taskListComponent!: TaskListComponent;

  /** Title of the tasks section */
  title: string = '';

  /** Label for the "Add Task" button */
  addTaskLabel: string = '';

  /** Subscription to language changes */
  private langSub?: Subscription;

  /**
   * Injects services for opening dialogs and managing translations.
   * @param dialog - Angular Material Dialog service
   * @param languageService - Custom service to handle dynamic translations
   */
  constructor(
      private dialog: MatDialog,
      private languageService: LanguageService
  ) {}

  /**
   * Lifecycle hook called on component initialization.
   * Subscribes to language changes to update UI labels dynamically.
   */
  ngOnInit(): void {
    this.langSub = this.languageService.lang$.subscribe((lang: 'es' | 'en') => {
      this.title = this.languageService.getLabel('tasks', 'title');
      this.addTaskLabel = lang === 'es' ? 'Añadir tarea' : 'Add Task';
    });
  }

  /**
   * Lifecycle hook called before the component is destroyed.
   * Unsubscribes from observables to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }

  /**
   * Opens the dialog for adding a new task.
   * After the dialog closes, refreshes the task list if a new task was created.
   */
  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskListComponent.refreshTasks();
      }
    });
  }
}
