import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBrowserComponent } from './order-browser.component';

describe('OrderBrowserComponent', () => {
  let component: OrderBrowserComponent;
  let fixture: ComponentFixture<OrderBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderBrowserComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
