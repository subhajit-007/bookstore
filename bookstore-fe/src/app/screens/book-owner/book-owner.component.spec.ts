import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOwnerComponent } from './book-owner.component';

describe('BookOwnerComponent', () => {
  let component: BookOwnerComponent;
  let fixture: ComponentFixture<BookOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookOwnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
