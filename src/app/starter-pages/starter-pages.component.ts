import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-starter-pages',
  templateUrl: './starter-pages.component.html',
  styleUrls: ['./starter-pages.component.css'],
})
export class StarterPagesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public setMessageAndImageForCondition(condition: string) {
    let conditionMessage = '';
    let conditionImageUrl = '';
    if (condition == 'good') {
      conditionMessage =
        "That's very Good To Hear. Let's cheer it up by learning something cool !!";
      conditionImageUrl = 'assets/face11.png';
    } else {
      conditionMessage =
        "Don't Worry. You'll get over it. You know, sometimes distraction from a problem is a good solution.";
      conditionImageUrl = 'assets/face2.png';
    }
    let conditionElement = <HTMLHeadingElement>(
      document.getElementById('condition-text')
    );
    conditionElement.textContent = conditionMessage;
    let conditionImage = <HTMLImageElement>(
      document.getElementById('condition-img')
    );
    conditionImage.src = conditionImageUrl;
  }

  public hideCurrentAndShowNext(currentDivNumber: number) {
    let currentDiv = <HTMLDivElement>(
      document.getElementById(currentDivNumber.toString())
    );
    currentDiv.setAttribute('hidden', 'true');
    if (currentDivNumber == 6) {
      new AppComponent().unBlurVisualizer();
    }
  }

  public bummer() {
    alert(
      'Ah well...Feel free to come back anytime !! You can just close the tab or you know, may be change your mind ??'
    );
  }
}
