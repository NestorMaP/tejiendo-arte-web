import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostProductFaq } from './post-product-faq';

describe('PostProductFaq', () => {
  let component: PostProductFaq;
  let fixture: ComponentFixture<PostProductFaq>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostProductFaq]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostProductFaq);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
