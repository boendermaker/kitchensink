import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsplaygroundComponent } from './rxjsplayground.component';

describe('RxjsplaygroundComponent', () => {
  let component: RxjsplaygroundComponent;
  let fixture: ComponentFixture<RxjsplaygroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsplaygroundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RxjsplaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
