import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditTableComponent } from './add-or-edit-table.component';

describe('AddOrEditTableComponent', () => {
  let component: AddOrEditTableComponent;
  let fixture: ComponentFixture<AddOrEditTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrEditTableComponent]
    });
    fixture = TestBed.createComponent(AddOrEditTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
