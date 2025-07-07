import { Component, EventEmitter, Input, Output } from '@angular/core';
import {Task, TaskViewModel} from "../../model/task.entity";
import { NgOptimizedImage } from "@angular/common";
import { MatCard, MatCardContent, MatCardSubtitle, MatCardTitle } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { TaskService } from "../../services/task.service";
import { TaskConfirmationDialogComponent } from "../task-confirmation-dialog/task-confirmation-dialog.component";

@Component({
  selector: 'app-task-item',
  imports: [
    MatCard,

    MatCardTitle,
    MatCardSubtitle,
    MatCardContent
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {

  /**
   * canConfirm: If the plant task is not scheduled for today,
   * the card will not be clickable to prevent confirmation.
   */
  @Input() task!: TaskViewModel;

  // Determines whether the task can be confirmed (clicked)
  @Input() canConfirm: boolean = true;

  // Emits the task when clicked
  @Output() taskClicked = new EventEmitter<TaskViewModel>();

  // Emits the task ID when deleted
  @Output() taskDeleted = new EventEmitter<number>();

  constructor(
      private dialog: MatDialog,
      private taskService: TaskService
  ) {}

  /**
   * Handles the click event on the task card.
   * If confirmation is allowed, opens a confirmation dialog.
   * If the user confirms, deletes the task using TaskService
   * and emits the deleted task's ID.
   */
  onClick(): void {
    if (!this.canConfirm) return;

    const dialogRef = this.dialog.open(TaskConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.taskService.delete(this.task.id).subscribe(() => {
          console.log(`Task ${this.task.id} deleted`);
          this.taskDeleted.emit(this.task.id);
        });
      }
    });
  }
}