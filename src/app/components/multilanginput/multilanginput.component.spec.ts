import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultilanginputComponent } from './multilanginput.component';

describe('MultilanginputComponent', () => {
  let component: MultilanginputComponent;
  let fixture: ComponentFixture<MultilanginputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultilanginputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultilanginputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
