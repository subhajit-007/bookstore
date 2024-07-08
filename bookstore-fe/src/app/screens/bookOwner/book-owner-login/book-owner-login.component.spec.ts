import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOwnerLoginComponent } from './book-owner-login.component';

describe('BookOwnerLoginComponent', () => {
  let component: BookOwnerLoginComponent;
  let fixture: ComponentFixture<BookOwnerLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookOwnerLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookOwnerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
