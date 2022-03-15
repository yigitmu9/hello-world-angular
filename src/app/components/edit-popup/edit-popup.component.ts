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
  @Output() onUpdateTask: EventEmitter<Task> = new EventEmitter();

  text2!: string;
  day2!: string;
  time2!: string;
  reminder2: boolean = false;
  id!: number;
  showDialog!: boolean;
  subscription: Subscription;


  constructor(private taskService: TaskService,private uiService: UiService, private fb: FormBuilder,private dateAdapter: DateAdapter<Date>) {
    this.subscription = this.uiService.onOpenDialog().subscribe((value) => (this.showDialog = value))
    this.dateAdapter.setLocale('tr');
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
    this.editTaskForm.valueChanges.subscribe(console.log)
  }

  onUpdate() {
    console.log(this.tasks);


    const updateTask = {
      id:this.id,
      text: this.text2,
      day: this.day2,
      time: this.time2,
      reminder: this.reminder2,
    };

    this.onUpdateTask.emit(updateTask);
    this.text2='';
    this.day2='';
    this.time2='';
    this.reminder2 = false;
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
