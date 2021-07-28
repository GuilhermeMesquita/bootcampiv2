import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualRestaurantComponent } from './individual-restaurant.component';

describe('IndividualRestaurantComponent', () => {
  let component: IndividualRestaurantComponent;
  let fixture: ComponentFixture<IndividualRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
