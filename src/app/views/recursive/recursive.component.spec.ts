import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursiveComponent } from './recursive.component';

describe('RecursiveComponent', () => {
  let component: RecursiveComponent;
  let fixture: ComponentFixture<RecursiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecursiveComponent]
    });
    fixture = TestBed.createComponent(RecursiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
