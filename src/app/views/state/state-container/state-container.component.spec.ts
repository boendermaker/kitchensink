import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateContainerComponent } from './state-container.component';

describe('StateContainerComponent', () => {
  let component: StateContainerComponent;
  let fixture: ComponentFixture<StateContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StateContainerComponent]
    });
    fixture = TestBed.createComponent(StateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
