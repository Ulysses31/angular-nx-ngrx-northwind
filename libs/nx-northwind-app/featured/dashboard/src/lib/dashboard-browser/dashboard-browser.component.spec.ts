import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBrowserComponent } from './dashboard-browser.component';

describe('DashboardBrowserComponent', () => {
  let component: DashboardBrowserComponent;
  let fixture: ComponentFixture<DashboardBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardBrowserComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
