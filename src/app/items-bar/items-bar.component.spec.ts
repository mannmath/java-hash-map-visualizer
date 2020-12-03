import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsBarComponent } from './items-bar.component';

describe('ItemsBarComponent', () => {
  let component: ItemsBarComponent;
  let fixture: ComponentFixture<ItemsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
