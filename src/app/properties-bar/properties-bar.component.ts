import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-properties-bar',
  templateUrl: './properties-bar.component.html',
  styleUrls: ['./properties-bar.component.css'],
})
export class PropertiesBarComponent implements OnInit {
  initialCapacity = 6;
  loadFactor = 0.75;
  CollisionConvertThreshold = 3;

  constructor() {}

  ngOnInit(): void {}
}
