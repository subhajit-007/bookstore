import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOwnerSignupComponent } from './book-owner-signup.component';

describe('BookOwnerSignupComponent', () => {
  let component: BookOwnerSignupComponent;
  let fixture: ComponentFixture<BookOwnerSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookOwnerSignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookOwnerSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
