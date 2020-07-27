import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileShippingComponent } from './my-profile-shipping.component';

describe('MyProfileShippingComponent', () => {
  let component: MyProfileShippingComponent;
  let fixture: ComponentFixture<MyProfileShippingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfileShippingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
