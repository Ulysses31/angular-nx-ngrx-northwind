import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMasterDetailBrowserComponent } from './order-master-detail-browser.component';

describe('OrderMasterDetailBrowserComponent', () => {
  let component: OrderMasterDetailBrowserComponent;
  let fixture: ComponentFixture<OrderMasterDetailBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderMasterDetailBrowserComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(
      OrderMasterDetailBrowserComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
