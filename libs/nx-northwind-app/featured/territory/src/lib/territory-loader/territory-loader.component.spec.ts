import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritoryLoaderComponent } from './territory-loader.component';

describe('TerritoryLoaderComponent', () => {
  let component: TerritoryLoaderComponent;
  let fixture: ComponentFixture<TerritoryLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerritoryLoaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TerritoryLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
