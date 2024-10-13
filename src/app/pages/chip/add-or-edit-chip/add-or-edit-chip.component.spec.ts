import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditChipComponent } from './add-or-edit-chip.component';

describe('AddOrEditChipComponent', () => {
  let component: AddOrEditChipComponent;
  let fixture: ComponentFixture<AddOrEditChipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrEditChipComponent]
    });
    fixture = TestBed.createComponent(AddOrEditChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
