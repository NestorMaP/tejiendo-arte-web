import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCategory } from './post-category';

describe('PostCategory', () => {
  let component: PostCategory;
  let fixture: ComponentFixture<PostCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
