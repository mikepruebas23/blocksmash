import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit {

  constructor() { }

  boxElements: {};

  ngOnInit() {
    this.drawGrid();
  }

  drawGrid(){
    this.boxElements = [
      {
        number: 1,
        class: "green",
        value: true
      },
      {
        number: 2,
        class: "red",
        value: false
      },
      {
        number: 3,
        class: "green",
        value: true
      },
      {
        number: 4,
        class: "red",
        value: false
      }
    ];
  }

}
