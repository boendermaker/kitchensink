import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridsterdashboardComponent } from './gridsterdashboard.component';

describe('GridsterdashboardComponent', () => {
  let component: GridsterdashboardComponent;
  let fixture: ComponentFixture<GridsterdashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridsterdashboardComponent]
    });
    fixture = TestBed.createComponent(GridsterdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
