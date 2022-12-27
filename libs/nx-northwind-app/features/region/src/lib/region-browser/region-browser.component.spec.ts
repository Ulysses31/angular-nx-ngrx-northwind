import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionBrowserComponent } from './region-browser.component';

describe('RegionBrowserComponent', () => {
  let component: RegionBrowserComponent;
  let fixture: ComponentFixture<RegionBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegionBrowserComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RegionBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
