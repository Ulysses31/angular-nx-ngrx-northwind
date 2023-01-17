import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritoryBrowserComponent } from './territory-browser.component';

describe('TerritoryBrowserComponent', () => {
  let component: TerritoryBrowserComponent;
  let fixture: ComponentFixture<TerritoryBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerritoryBrowserComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TerritoryBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
