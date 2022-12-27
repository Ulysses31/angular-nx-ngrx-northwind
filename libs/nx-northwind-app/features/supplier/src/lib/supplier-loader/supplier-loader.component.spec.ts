import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierLoaderComponent } from './supplier-loader.component';

describe('SupplierLoaderComponent', () => {
  let component: SupplierLoaderComponent;
  let fixture: ComponentFixture<SupplierLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupplierLoaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SupplierLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
