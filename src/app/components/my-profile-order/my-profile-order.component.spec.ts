import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileOrderComponent } from './my-profile-order.component';

describe('MyProfileOrderComponent', () => {
  let component: MyProfileOrderComponent;
  let fixture: ComponentFixture<MyProfileOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfileOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
