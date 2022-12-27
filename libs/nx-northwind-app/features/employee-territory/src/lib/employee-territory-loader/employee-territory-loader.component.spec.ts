import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTerritoryLoaderComponent } from './employee-territory-loader.component';

describe('EmployeeTerritoryLoaderComponent', () => {
  let component: EmployeeTerritoryLoaderComponent;
  let fixture: ComponentFixture<EmployeeTerritoryLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeTerritoryLoaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(
      EmployeeTerritoryLoaderComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
