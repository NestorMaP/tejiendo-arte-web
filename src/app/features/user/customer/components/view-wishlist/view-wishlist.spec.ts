import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWishlist } from './view-wishlist';

describe('ViewWishlist', () => {
  let component: ViewWishlist;
  let fixture: ComponentFixture<ViewWishlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewWishlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewWishlist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
