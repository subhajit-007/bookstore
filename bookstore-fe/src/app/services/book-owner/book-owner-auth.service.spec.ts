import { TestBed } from '@angular/core/testing';

import { BookOwnerAuthService } from './book-owner-auth.service';

describe('BookOwnerAuthService', () => {
  let service: BookOwnerAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookOwnerAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
