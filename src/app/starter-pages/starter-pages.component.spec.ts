import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterPagesComponent } from './starter-pages.component';

describe('StarterPagesComponent', () => {
  let component: StarterPagesComponent;
  let fixture: ComponentFixture<StarterPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarterPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarterPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
