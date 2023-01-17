import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBrowserComponent } from './employee-browser.component';

describe('EmployeeBrowserComponent', () => {
  let component: EmployeeBrowserComponent;
  let fixture: ComponentFixture<EmployeeBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeBrowserComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
