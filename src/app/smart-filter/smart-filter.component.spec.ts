import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartFilterComponent } from './smart-filter.component';

describe('SmartFilterComponent', () => {
  let component: SmartFilterComponent;
  let fixture: ComponentFixture<SmartFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmartFilterComponent]
    });
    fixture = TestBed.createComponent(SmartFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
