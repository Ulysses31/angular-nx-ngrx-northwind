import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailLoaderComponent } from './order-detail-loader.component';

describe('OrderDetailLoaderComponent', () => {
  let component: OrderDetailLoaderComponent;
  let fixture: ComponentFixture<OrderDetailLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderDetailLoaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderDetailLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
