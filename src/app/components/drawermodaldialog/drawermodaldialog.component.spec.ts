import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawermodaldialogComponent } from './drawermodaldialog.component';

describe('DrawermodaldialogComponent', () => {
  let component: DrawermodaldialogComponent;
  let fixture: ComponentFixture<DrawermodaldialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawermodaldialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawermodaldialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
