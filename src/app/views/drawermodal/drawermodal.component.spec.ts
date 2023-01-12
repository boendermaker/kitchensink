import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawermodalComponent } from './drawermodal.component';

describe('DrawermodalComponent', () => {
  let component: DrawermodalComponent;
  let fixture: ComponentFixture<DrawermodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawermodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawermodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
