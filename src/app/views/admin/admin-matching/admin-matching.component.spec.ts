import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMatchingComponent } from './admin-matching.component';

describe('AdminMatchingComponent', () => {
  let component: AdminMatchingComponent;
  let fixture: ComponentFixture<AdminMatchingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMatchingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMatchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
