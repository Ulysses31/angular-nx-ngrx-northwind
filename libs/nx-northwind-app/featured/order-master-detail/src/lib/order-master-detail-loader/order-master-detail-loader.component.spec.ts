import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMasterDetailLoaderComponent } from './order-master-detail-loader.component';

describe('OrderMasterDetailLoaderComponent', () => {
  let component: OrderMasterDetailLoaderComponent;
  let fixture: ComponentFixture<OrderMasterDetailLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderMasterDetailLoaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(
      OrderMasterDetailLoaderComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
