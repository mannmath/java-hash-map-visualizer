import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  starterCompleted: false;

  public unBlurVisualizer() {
    let visualizer = <HTMLDivElement>document.getElementById('visualizer');
    // visualizer.style.filter = 'blur(0px)';
    visualizer.setAttribute(
      'style',
      '-webkit-filter:blur(0px);filter: blur(0px);pointer-events: auto;'
    );
  }
}
