import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Output() change!: EventEmitter<MatSlideToggleChange>;
  @Input() checked!: boolean;

  isChecked = true;
  formGroup!: FormGroup;
  filteringSchedule!: boolean;
  toggle!: boolean;





  toggleLightTheme(): void {
    if (this.filteringSchedule == false) {
      document.body.classList.add('light-mode');
    }
    if (this.filteringSchedule == true) {
      document.body.classList.toggle('light-mode');
    }

  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.filteringSchedule = JSON.parse(localStorage.getItem('toggleButtonState') as string);
    console.log(this.filteringSchedule);
  }



  onChange(ob: MatSlideToggleChange) {
    this.filteringSchedule = !this.filteringSchedule;
    localStorage.setItem('toggleButtonState', JSON.stringify(this.filteringSchedule));

  }

}
