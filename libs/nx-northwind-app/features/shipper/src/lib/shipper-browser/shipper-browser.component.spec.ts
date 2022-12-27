import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipperBrowserComponent } from './shipper-browser.component';

describe('ShipperBrowserComponent', () => {
  let component: ShipperBrowserComponent;
  let fixture: ComponentFixture<ShipperBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShipperBrowserComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ShipperBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
