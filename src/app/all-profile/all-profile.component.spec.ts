import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProfileComponent } from './all-profile.component';

describe('AllProfileComponent', () => {
  let component: AllProfileComponent;
  let fixture: ComponentFixture<AllProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllProfileComponent]
    });
    fixture = TestBed.createComponent(AllProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
