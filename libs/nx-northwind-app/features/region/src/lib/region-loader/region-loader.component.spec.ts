import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionLoaderComponent } from './region-loader.component';

describe('RegionLoaderComponent', () => {
  let component: RegionLoaderComponent;
  let fixture: ComponentFixture<RegionLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegionLoaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RegionLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
