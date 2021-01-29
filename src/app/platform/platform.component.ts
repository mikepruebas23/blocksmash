import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit {

  boxId: string;
  @ViewChild('') myDiv: ElementRef;

  constructor(@Inject(DOCUMENT) document) { }

  boxElements: {};

  ngOnInit() {
    this.drawGrid();
  }

  //show all elements
  drawGrid(){
    // console.log(this.randomNumber());
    this.boxElements = [
      {
        number: 1,
        class: "green",
        value: true,
        rndom: this.randomNumber()
      },
      {
        number: 2,
        class: "red",
        value: false,
        rndom: this.randomNumber()
      },
      {
        number: 3,
        class: "green",
        value: true,
        rndom: this.randomNumber()
      },
      {
        number: 4,
        class: "red",
        value: false,
        rndom: this.randomNumber()
      },
      {
        number: 5,
        class: "green",
        value: true,
        rndom: this.randomNumber()
      },
      {
        number: 6,
        class: "red",
        value: false,
        rndom: this.randomNumber()
      },
      {
        number: 7,
        class: "green",
        value: true,
        rndom: this.randomNumber()
      },
      {
        number: 8,
        class: "red",
        value: false,
        rndom: this.randomNumber()
      }
    ];


    let i;
    let boxLength = Object.keys( this.boxElements).length; 
    // console.log();
    for(i = 0; i < boxLength; i++){
      if(this.boxElements[i].rndom == 2){
        this.boxElements[i].class = "red";
      }
      else {
        this.boxElements[i].class = "green";
      }
      console.log(this.boxElements[i]);
    }
  }

  //select actual box
  selectBox(index){
    let box = this.boxElements[index];
    // console.log(index);
    // console.log(this.boxElements[index]);
    this.flipBox(box)
  }

  //Flip selected box
  flipBox(box){
    
    let boxElement = document.getElementById(box.number);
    // let boxId = this.myDiv.id = '5'
    let bloxClass = box.class;
    boxElement.classList.add(bloxClass);
    // console.log(boxElement);
  }

  //generate number random
  randomNumber(){
    let rndm = Math.floor(Math.random() * 2) + 1;
    return rndm;
  }

}
