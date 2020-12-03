import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizerSpaceComponent } from './visualizer-space.component';

describe('VisualizerSpaceComponent', () => {
  let component: VisualizerSpaceComponent;
  let fixture: ComponentFixture<VisualizerSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizerSpaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizerSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
