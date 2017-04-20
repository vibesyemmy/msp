import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMatchingEditComponent } from './admin-matching-edit.component';

describe('AdminMatchingEditComponent', () => {
  let component: AdminMatchingEditComponent;
  let fixture: ComponentFixture<AdminMatchingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMatchingEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMatchingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
