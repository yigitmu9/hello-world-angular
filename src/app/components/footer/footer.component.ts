import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  toggleLightTheme(): void {
    document.body.classList.toggle('light-mode');
  }

  constructor() { }

  ngOnInit(): void {
  }

}
