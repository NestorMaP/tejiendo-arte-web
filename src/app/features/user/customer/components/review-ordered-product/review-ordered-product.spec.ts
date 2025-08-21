import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewOrderedProduct } from './review-ordered-product';

describe('ReviewOrderedProduct', () => {
  let component: ReviewOrderedProduct;
  let fixture: ComponentFixture<ReviewOrderedProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewOrderedProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewOrderedProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
