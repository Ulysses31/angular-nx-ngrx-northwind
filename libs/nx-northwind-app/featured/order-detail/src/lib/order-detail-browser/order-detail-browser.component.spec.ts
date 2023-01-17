import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailBrowserComponent } from './order-detail-browser.component';

describe('OrderDetailBrowserComponent', () => {
  let component: OrderDetailBrowserComponent;
  let fixture: ComponentFixture<OrderDetailBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderDetailBrowserComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderDetailBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
