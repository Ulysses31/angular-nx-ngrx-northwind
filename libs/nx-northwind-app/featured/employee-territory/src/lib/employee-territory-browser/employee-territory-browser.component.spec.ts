import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTerritoryBrowserComponent } from './employee-territory-browser.component';

describe('EmployeeTerritoryBrowserComponent', () => {
  let component: EmployeeTerritoryBrowserComponent;
  let fixture: ComponentFixture<EmployeeTerritoryBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeTerritoryBrowserComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(
      EmployeeTerritoryBrowserComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
