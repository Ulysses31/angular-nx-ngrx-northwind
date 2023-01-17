import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipperLoaderComponent } from './shipper-loader.component';

describe('ShipperLoaderComponent', () => {
  let component: ShipperLoaderComponent;
  let fixture: ComponentFixture<ShipperLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShipperLoaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ShipperLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
