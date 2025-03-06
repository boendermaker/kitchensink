import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomigrationsComponent } from './automigrations.component';

describe('AutomigrationsComponent', () => {
  let component: AutomigrationsComponent;
  let fixture: ComponentFixture<AutomigrationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutomigrationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomigrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
