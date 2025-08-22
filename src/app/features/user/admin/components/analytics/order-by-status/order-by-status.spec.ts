import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderByStatus } from './order-by-status';

describe('OrderByStatus', () => {
  let component: OrderByStatus;
  let fixture: ComponentFixture<OrderByStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderByStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderByStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
