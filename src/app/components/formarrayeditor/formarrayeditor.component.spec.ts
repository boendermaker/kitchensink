import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormarrayeditorComponent } from './formarrayeditor.component';

describe('FormarrayeditorComponent', () => {
  let component: FormarrayeditorComponent;
  let fixture: ComponentFixture<FormarrayeditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormarrayeditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormarrayeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
