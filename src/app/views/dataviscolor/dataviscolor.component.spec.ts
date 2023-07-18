import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataviscolorComponent } from './dataviscolor.component';

describe('DataviscolorComponent', () => {
  let component: DataviscolorComponent;
  let fixture: ComponentFixture<DataviscolorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataviscolorComponent]
    });
    fixture = TestBed.createComponent(DataviscolorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
