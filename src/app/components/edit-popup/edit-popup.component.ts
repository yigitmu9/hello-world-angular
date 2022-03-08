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
    text: [''],
    day: [''],
    time:[''],
    reminder:['']
  })
  tasks: Task[] = [];
  @Input() task!: Task;
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  @Output() onUpdateTask: EventEmitter<Task> = new EventEmitter();

  text!: string;
  day!: string;
  time!: string;
  reminder: boolean = false;
  id!: number;
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
    console.log(this.tasks);
    this.onUpdateTask.emit(this.task);

    const updateTask = {
      id:this.id,
      text: this.text,
      day: this.day,
      time: this.time,
      reminder: this.reminder,
    };

    this.onUpdateTask.emit(updateTask);
    this.text='';
    this.day='';
    this.time='';
    this.reminder=false;
    this.taskService.addTask(this.task).subscribe((task) => (this.tasks.push(task)));
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
