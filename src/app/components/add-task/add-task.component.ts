import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Task} from "../../Task";
import {Subscription} from "rxjs";
import {UiService} from "../../services/ui.service";
import {FormBuilder, FormArray, FormGroup} from "@angular/forms";
import {NgxMaterialTimepickerTheme} from "ngx-material-timepicker";
import {DateAdapter} from "@angular/material/core";


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  addTaskForm= this.fb.group ({
    text: [''],
    day: [''],
    time:[''],
    reminder:['']
  })
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  text!: string;
  day!: string;
  time!: string;
  reminder: boolean = false;
  id!: number;
  showAddTask!: boolean;
  subscription: Subscription;


  constructor(private uiService: UiService,private fb: FormBuilder,private dateAdapter: DateAdapter<Date>) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
    this.dateAdapter.setLocale('tr');
  }

  ngOnInit(): void {

  }
  onSubmit() {
    if(!this.text) {
      alert('Please add a task!');
      return;
    }
    const newTask = {
      id:this.id,
      text: this.text,
      day: this.day,
      time: this.time,
      reminder: this.reminder,
    };

    this.onAddTask.emit(newTask);
    this.text='';
    this.day='';
    this.time='';
    this.reminder=false;


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

