import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
arrNumber = []
  constructor() {
    for (let i = 0; i < 10000; i++) {
      this.arrNumber.push(i);
    }
  }

  ngOnInit() {

  }

}
