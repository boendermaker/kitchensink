import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlcontainerComponent } from './controlcontainer.component';

describe('ControlcontainerComponent', () => {
  let component: ControlcontainerComponent;
  let fixture: ComponentFixture<ControlcontainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlcontainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControlcontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
