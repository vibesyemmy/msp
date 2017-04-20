import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspendedUserComponent } from './suspended-user.component';

describe('SuspendedUserComponent', () => {
  let component: SuspendedUserComponent;
  let fixture: ComponentFixture<SuspendedUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspendedUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspendedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
