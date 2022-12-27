import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLoaderComponent } from './employee-loader.component';

describe('EmployeeLoaderComponent', () => {
  let component: EmployeeLoaderComponent;
  let fixture: ComponentFixture<EmployeeLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeLoaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
