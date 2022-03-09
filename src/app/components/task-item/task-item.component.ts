import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import {MatDialog} from "@angular/material/dialog";
import {EditPopupComponent} from "../edit-popup/edit-popup.component";
import {UiService} from "../../services/ui.service";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  @Input() task!: Task;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter();
  @Output() onOpenDialog: EventEmitter<Task> = new EventEmitter();

  faTimes = faTimes;
  faEdit = faEdit;

  constructor(private dialogRef : MatDialog, private uiService: UiService) {}

  ngOnInit(): void {}

  openDialog() {
    console.log(this.task);
    this.dialogRef.open(EditPopupComponent);
    this.uiService.openDialog();
    this.onOpenDialog.emit(this.task);
  }

  onDelete() {
    this.onDeleteTask.emit(this.task);
  }


  onToggle() {
    this.onToggleReminder.emit(this.task);
  }
}
