import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task';
import { TaskService } from '../../services/task.service';
import {UiService} from "../../services/ui.service";
import {FormBuilder, FormArray, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {NgxMaterialTimepickerTheme} from "ngx-material-timepicker";
import {DateAdapter} from "@angular/material/core";
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.css']
})
export class EditPopupComponent implements OnInit {

  editTaskForm = this.fb.group ({
    text2: [''],
    day2: [''],
    time2:[''],
    reminder2:['']
  })
  tasks: Task[] = [];
  @Input() task!: Task;
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  @Output() onUpdateTask: EventEmitter<Task> = new EventEmitter();

  text2!: string;
  day2!: string;
  time2!: string;
  reminder2: boolean = false;
  id2!: number;
  showAddTask!: boolean;
  subscription: Subscription;


  constructor(private taskService: TaskService,private uiService: UiService, private fb: FormBuilder,private dateAdapter: DateAdapter<Date>) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
    this.dateAdapter.setLocale('tr');
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  onUpdate() {
    console.log(this.task);
    this.onUpdateTask.emit(this.task);
  }

  darkTimePicker: NgxMaterialTimepickerTheme = {

    container: {
      bodyBackgroundColor: '#424242',
      buttonColor: '#fff'
    },
    dial: {
      dialBackgroundColor: '#555',
    },
    clockFace: {
      clockFaceBackgroundColor: '#555',
      clockHandColor: '#ff0000',
      clockFaceTimeInactiveColor: '#fff'
    }
  }

}
