import { TestBed } from '@angular/core/testing';

import { UserviewService } from './userview.service';

describe('UserviewService', () => {
  let service: UserviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
