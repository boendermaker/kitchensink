import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragdroptabsComponent } from './dragdroptabs.component';

describe('DragdroptabsComponent', () => {
  let component: DragdroptabsComponent;
  let fixture: ComponentFixture<DragdroptabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DragdroptabsComponent]
    });
    fixture = TestBed.createComponent(DragdroptabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
