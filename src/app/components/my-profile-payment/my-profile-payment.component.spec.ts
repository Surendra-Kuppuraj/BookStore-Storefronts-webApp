import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfilePaymentComponent } from './my-profile-payment.component';

describe('MyProfilePaymentComponent', () => {
  let component: MyProfilePaymentComponent;
  let fixture: ComponentFixture<MyProfilePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfilePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfilePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
